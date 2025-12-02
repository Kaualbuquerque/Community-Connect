import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './types/jwt-payload.interface';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Executa geração de salt e hash em paralelo
    const [salt] = await Promise.all([
      bcrypt.genSalt(),
    ]);

    const hash = await bcrypt.hash(dto.password, salt);

    // Criação do usuário (única operação I/O)
    const user = await this.usersService.create({
      ...dto,
      password: hash,
    });

    const { password, ...rest } = user;
    return rest;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) return null;

    // Comparação bcrypt é CPU-bound, mas não faz sentido paralelizar aqui
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    // Sinalização do JWT é síncrona, mas não bloqueia a main thread de forma severa
    const payload: JwtPayload = { sub: user.id, role: user.role };

    // Assinatura e retorno do user em paralelo
    const [token] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);

    return {
      access_token: token,
      user,
    };
  }

  async validateJwtPayload(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
