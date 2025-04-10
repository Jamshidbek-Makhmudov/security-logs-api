import { ApiProperty } from '@nestjs/swagger'

export class SecurityEvent {
  @ApiProperty()
  id: number

  @ApiProperty()
  client_id: string

  @ApiProperty()
  user_id: string

  @ApiProperty()
  event_type: string

  @ApiProperty()
  details: Record<string, any>

  @ApiProperty()
  occurred_at: Date

  @ApiProperty()
  created_at: Date
}
