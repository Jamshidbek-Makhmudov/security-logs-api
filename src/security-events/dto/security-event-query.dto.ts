import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class SecurityEventQueryDto {
  @ApiProperty({
    required: false,
    example: 'USB_INSERT',
    description: 'Filter by event type',
  })
  @IsOptional()
  @IsString()
  event_type?: string

  @ApiProperty({
    required: false,
    example: '2025-03-10',
    description: 'Filter by date (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsString()
  date?: string

  @ApiProperty({
    required: false,
    example: '1',
    description: 'Page number',
  })
  @IsOptional()
  @IsNumberString()
  page?: string = '1'

  @ApiProperty({
    required: false,
    example: '20',
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string = '20'
}
