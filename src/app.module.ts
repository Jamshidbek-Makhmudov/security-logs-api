import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EmailModule } from './email/email.module'
import { PrismaModule } from './prisma/prisma.module'
import { SecurityEventsModule } from './security-events/security-events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SecurityEventsModule,
    EmailModule,
  ],
})
export class AppModule {}
