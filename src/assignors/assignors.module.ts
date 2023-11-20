import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AssignorsController],
  providers: [AssignorsService],
  imports: [PrismaModule],
})
export class AssignorsModule {}
