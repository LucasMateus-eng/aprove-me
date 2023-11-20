import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AssignorsModule } from './assignors/assignors.module';

@Module({
  imports: [PrismaModule, AssignorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
