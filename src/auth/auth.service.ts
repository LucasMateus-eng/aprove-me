import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { login: login } });

    if (!user) {
      throw new NotFoundException(`No user found for login: ${login}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
