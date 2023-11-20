import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignorDto {
  @ApiProperty({ required: true })
  document: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty({ required: true })
  name: string;
}
