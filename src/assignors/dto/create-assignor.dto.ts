import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ required: true })
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({ required: true })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  @ApiProperty({ required: true })
  name: string;
}
