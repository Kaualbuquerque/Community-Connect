// src/modules/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    location: string;

    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsIn(['consumer', 'provider'])
    role: 'consumer' | 'provider';
}
