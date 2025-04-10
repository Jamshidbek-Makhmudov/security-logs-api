import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class SecurityEventSummaryDto {
  @ApiProperty({
    required: false,
    example: '2025-03-10',
    description: 'Date for summary (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsString()
  date?: string
}
