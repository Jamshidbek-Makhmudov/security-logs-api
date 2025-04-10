import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateSecurityEventDto {
  @ApiProperty({
    example: 'PC-001',
    description: 'Client identifier',
  })
  @IsString()
  @IsNotEmpty()
  client_id: string

  @ApiProperty({
    example: 'user123',
    description: 'User identifier',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string

  @ApiProperty({
    example: 'USB_INSERT',
    description: 'Type of security event',
  })
  @IsString()
  @IsNotEmpty()
  event_type: string

  @ApiProperty({
    example: { device_name: 'SanDisk CruzerBlade', memory_size: '64GB' },
    description: 'Event details in JSON format',
  })
  @IsObject()
  details: Record<string, any>

  @ApiProperty({
    example: '2025-03-10T10:01:10Z',
    description: 'When the event occurred',
  })
  @IsDateString()
  occurred_at: string
}
