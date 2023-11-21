import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
