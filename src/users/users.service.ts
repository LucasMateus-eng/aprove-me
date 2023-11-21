import { Logger, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private roundsOfHashing: number;
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const roundsOfHashing = this.configService.get<number>('roundsOfHashing');

    if (!roundsOfHashing) {
      throw new Error(`Rounds of hashing required`);
    }

    this.roundsOfHashing = roundsOfHashing;
  }

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Create a user`);

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    this.logger.log(`Retrieve all users`);

    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    this.logger.log(`Retrieve user with id ${id}`);

    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Update user with id ${id}`);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        this.roundsOfHashing,
      );
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    this.logger.log(`Remove user with id ${id}`);

    return this.prisma.user.delete({ where: { id } });
  }
}
