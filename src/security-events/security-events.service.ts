/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common'
import { EmailService } from '../email/email.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSecurityEventDto } from './dto/create-security-event.dto'
import { SecurityEventSummaryDto } from './dto/security-event-summary.dto'
import { SecurityEventsGateway } from './security-events.gateway'

@Injectable()
export class SecurityEventsService {
  // Logger instance for logging messages
  private readonly logger = new Logger(SecurityEventsService.name)

  // Predefined list of event types
  private readonly alertEventTypes = ['USB_INSERT']

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private eventsGateway: SecurityEventsGateway,
  ) {}

  // Creates a new security event in the database and triggers event emission and alerts if necessary
  async create(dto: CreateSecurityEventDto) {
    try {
      // Save the event to the database
      const securityEvent = await this.prisma.securityEvent.create({
        data: {
          clientId: dto.client_id,
          userId: dto.user_id,
          eventType: dto.event_type,
          details: dto.details,
          occurredAt: new Date(dto.occurred_at), // Convert the event date to Date object
        },
      })

      // Emit the security event through the WebSocket gateway
      this.eventsGateway.emitSecurityEvent(dto)

      // If the event type is one that requires an alert, send the alert via email
      if (this.alertEventTypes.includes(dto.event_type)) {
        await this.emailService.sendSecurityAlert(dto.event_type, dto.details)
      }

      return securityEvent
    } catch (error) {
      this.logger.error(`Failed to create security event: ${error.message}`)
      throw error
    }
  }

  // Retrieves a paginated list of security events, optionally filtered by event type and date
  async findAll(event_type: string, date: string, page: number, limit: number) {
    const skip = (page - 1) * limit

    // Prepare the filter for database query
    const where: { eventType?: string; occurredAt?: { gte: Date; lt: Date } } = {}

    if (event_type) {
      where.eventType = event_type // Filter by event type
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)

      where.occurredAt = {
        gte: startDate,
        lt: endDate,
      }
    }

    try {
      // Fetch the events and total count from the database in parallel
      const [events, totalCount] = await Promise.all([
        this.prisma.securityEvent.findMany({
          where,
          skip,
          take: limit,
          orderBy: { occurredAt: 'desc' },
        }),
        this.prisma.securityEvent.count({ where }),
      ])

      return {
        data: events,
        meta: {
          total: totalCount,
          page,
          limit,
          pages: Math.ceil(totalCount / limit),
        },
      }
    } catch (error) {
      this.logger.error(`Failed to fetch security events: ${error.message}`)
      throw error
    }
  }

  // Retrieves a summary of security events grouped by event type
  async getSummary(query: SecurityEventSummaryDto) {
    try {
      const { date } = query

      let dateFilter = {}
      if (date) {
        const startDate = new Date(date)
        const endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)

        dateFilter = {
          occurredAt: {
            gte: startDate,
            lt: endDate,
          },
        }
      }

      const eventCounts = await this.prisma.securityEvent.groupBy({
        by: ['eventType'], // Group by event type
        where: dateFilter, //  the date filter
        _count: {
          eventType: true, // Count the number of events for each event type
        },
      })

      // Transform the grouped results into a simple summary object
      const summary = eventCounts.reduce((acc, item) => {
        acc[item.eventType] = item._count.eventType
        return acc
      }, {})

      return summary
    } catch (error) {
      this.logger.error(`Failed to get security events summary: ${error.message}`)
      throw error
    }
  }
}
