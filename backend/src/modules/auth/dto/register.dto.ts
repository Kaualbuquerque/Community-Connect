// src/modules/auth/dto/register.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
  Matches,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'Endereço de email válido do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário (mínimo de 6 caracteres)',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    example: '(81) 91234-5678',
    description: 'Número de telefone no formato brasileiro',
  })
  @IsNotEmpty()
  @Matches(/^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$/, {
    message:
      'Phone number must be a valid Brazilian format (e.g. (81) 91234-5678)',
  })
  phone: string;

  @ApiProperty({
    example: 'consumer',
    description: 'Tipo de usuário: consumidor ou prestador de serviço',
    enum: ['consumer', 'provider'],
  })
  @IsNotEmpty()
  @IsIn(['consumer', 'provider'])
  role: 'consumer' | 'provider';

  // 📦 Campos de endereço

  @ApiProperty({
    example: '50741-540',
    description: 'CEP no formato 12345-678',
  })
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'CEP must be in the format 12345-678',
  })
  cep: string;

  @ApiProperty({
    example: 'PE',
    description: 'Sigla do estado (2 letras)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2, { message: 'State must be a 2-letter code (e.g. SP)' })
  state: string;

  @ApiProperty({
    example: 'Recife',
    description: 'Nome da cidade do usuário',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'City must be between 1 and 100 characters' })
  city: string;

  @ApiProperty({
    example: '123',
    description: 'Número do endereço (pode incluir complemento)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'Number must be between 1 and 20 characters' })
  number: string;
}
