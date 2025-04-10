import { Body, Controller, Get, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { toNumber } from '../utils/toNumber'
import { CreateSecurityEventDto } from './dto/create-security-event.dto'
import { SecurityEventQueryDto } from './dto/security-event-query.dto'
import { SecurityEventSummaryDto } from './dto/security-event-summary.dto'
import { SecurityEventsService } from './security-events.service'

@ApiTags('security-events')
@Controller('security-events')
export class SecurityEventsController {
  constructor(private readonly securityEventsService: SecurityEventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new security event' })
  @ApiBody({ type: CreateSecurityEventDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The security event has been successfully created.',
  })
  create(@Body() dto: CreateSecurityEventDto) {
    return this.securityEventsService.create(dto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get security events with filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of security events based on the provided filters.',
  })
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: SecurityEventQueryDto,
  ) {
    const { event_type, date, page, limit } = query
    return this.securityEventsService.findAll(event_type, date, toNumber(page), toNumber(limit))
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get summary of security events by type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a summary of security events counts by type.',
  })
  getSummary(
    @Query(new ValidationPipe({ transform: true }))
    query: SecurityEventSummaryDto,
  ) {
    return this.securityEventsService.getSummary(query)
  }
}
