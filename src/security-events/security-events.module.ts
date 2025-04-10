import { Module } from '@nestjs/common'
import { EmailModule } from '../email/email.module'
import { PrismaModule } from '../prisma/prisma.module'
import { SecurityEventsController } from './security-events.controller'
import { SecurityEventsGateway } from './security-events.gateway'
import { SecurityEventsService } from './security-events.service'

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [SecurityEventsController],
  providers: [SecurityEventsService, SecurityEventsGateway],
  exports: [SecurityEventsService],
})
export class SecurityEventsModule {}
