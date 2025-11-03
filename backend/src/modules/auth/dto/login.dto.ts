// src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'usuario@email.com',
        description: 'Email do usuário utilizado para login',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Senha do usuário',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
