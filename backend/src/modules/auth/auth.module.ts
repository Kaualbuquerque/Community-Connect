// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WsJwtGuard } from './guards/ws-jwt.guard';

@Module({
  imports: [
    ConfigModule, // importa o ConfigModule para este módulo
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiresIn = config.get<string>('JWT_EXPIRATION') || '1h';

        if (!secret) {
          throw new Error('JWT_SECRET não está definido');
        }

        return {
          secret,
          signOptions: {
            expiresIn, // agora é garantido que nunca é undefined
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, WsJwtGuard],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, JwtStrategy, JwtModule],
})
export class AuthModule { }
