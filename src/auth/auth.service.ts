import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly USER_NOT_FOUND = 'No user found for login: ';
  private readonly INVALID_CREDENTIALS = 'Invalid credentials';

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<AuthEntity> {
    this.logger.log(`The user (${login}) has completed the login process`);

    const user = await this.prisma.user.findUnique({ where: { login: login } });

    if (!user) {
      this.logger.error(`${this.USER_NOT_FOUND}${login}`);

      throw new NotFoundException(`${this.USER_NOT_FOUND}${login}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.error(`${this.INVALID_CREDENTIALS}`);

      throw new UnauthorizedException(`${this.INVALID_CREDENTIALS}`);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
