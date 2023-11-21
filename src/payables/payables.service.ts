import { Injectable, Logger } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayablesService {
  private readonly logger = new Logger(PayablesService.name);

  constructor(private prisma: PrismaService) {}

  create(createPayableDto: CreatePayableDto) {
    this.logger.log(`Create a payable`);

    return this.prisma.payable.create({ data: createPayableDto });
  }

  findAll() {
    this.logger.log(`Retrieve all payables`);

    return this.prisma.payable.findMany();
  }

  findOne(id: string) {
    this.logger.log(`Retrieve payable with id ${id}`);

    return this.prisma.payable.findUnique({
      where: { id },
      include: { assignor: true },
    });
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
    this.logger.log(`Update payable with id ${id}`);

    return this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  remove(id: string) {
    this.logger.log(`Remove payable with id ${id}`);

    return this.prisma.payable.delete({ where: { id } });
  }
}
