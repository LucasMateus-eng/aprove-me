import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  value: number;

  @IsNotEmpty()
  @IsISO8601({
    strict: true,
  })
  @ApiProperty({ required: true })
  emissionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ required: true })
  assignorId: string;
}
