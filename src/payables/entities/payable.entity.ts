import { ApiProperty } from '@nestjs/swagger';
import { Payable } from '@prisma/client';

export class PayableEntity implements Payable {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  emissionDate: Date;

  @ApiProperty()
  assignorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
