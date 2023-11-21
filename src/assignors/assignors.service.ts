import { Injectable, Logger } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignorsService {
  private readonly logger = new Logger(AssignorsService.name);

  constructor(private prisma: PrismaService) {}

  create(createAssignorDto: CreateAssignorDto) {
    this.logger.log(`Create a assignor`);

    return this.prisma.assignor.create({ data: createAssignorDto });
  }

  findAll() {
    this.logger.log(`Retrieve all assignors`);

    return this.prisma.assignor.findMany();
  }

  findOne(id: string) {
    this.logger.log(`Retrieve assignor with id ${id}`);

    return this.prisma.assignor.findUnique({ where: { id } });
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    this.logger.log(`Update assignor with id ${id}`);

    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  remove(id: string) {
    this.logger.log(`Remove assignor with id ${id}`);

    return this.prisma.assignor.delete({ where: { id } });
  }
}
