import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AssignorsModule } from './assignors/assignors.module';
import { PayablesModule } from './payables/payables.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import base from './config/base.config';

@Module({
  imports: [
    PrismaModule,
    AssignorsModule,
    PayablesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [base] }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
