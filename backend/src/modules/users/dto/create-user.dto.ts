import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "João Silva", description: "Nome completo do usuário" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: "joao@email.com", description: "Email do usuário" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "senha123", description: "Senha do usuário" })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        example: "(81) 91234-5678",
        description: "Telefone no formato brasileiro",
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$/, {
        message: "Phone number must be a valid Brazilian format (e.g. (81) 91234-5678)",
    })
    phone: string;

    @ApiProperty({
        example: "consumer",
        enum: ["consumer", "provider"],
        description: "Tipo de usuário",
    })
    @IsNotEmpty()
    @IsIn(["consumer", "provider"])
    role: "consumer" | "provider";

    @ApiProperty({
        example: "12345-678",
        description: "CEP do endereço",
    })
    @IsNotEmpty()
    @Matches(/^\d{5}-\d{3}$/, { message: "CEP must be in the format 12345-678" })
    cep: string;

    @ApiProperty({
        example: "SP",
        description: "Estado (sigla de 2 letras)",
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 2, { message: "State must be a 2-letter code (e.g. SP, RJ)" })
    state: string;

    @ApiProperty({
        example: "São Paulo",
        description: "Cidade",
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 100, { message: "City must be between 1 and 100 characters" })
    city: string;

    @ApiProperty({
        example: "123",
        description: "Número do endereço",
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 20, { message: "Number must be between 1 and 20 characters" })
    number: string;
}
