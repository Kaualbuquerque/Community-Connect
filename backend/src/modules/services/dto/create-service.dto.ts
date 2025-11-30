import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ServiceImage } from "src/modules/services_images/serviceImage.entity";

export class CreateServiceDto {
    @ApiProperty({ example: "Reparo de Eletricidade", description: "Nome do serviço" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: "Conserto de fiação e instalação elétrica", description: "Descrição detalhada do serviço" })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 150.50, description: "Preço do serviço (positivo, até 2 casas decimais)" })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;

    @ApiProperty({ example: "Elétrica", description: "Categoria do serviço" })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ example: "SP", description: "Estado do serviço (sigla de 2 letras)" })
    @IsNotEmpty()
    @IsString()
    state?: string;

    @ApiProperty({ example: "São Paulo", description: "Cidade do serviço" })
    @IsNotEmpty()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: "eletricista", description: "Palavra-chave opcional para busca" })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ type: [ServiceImage], description: "Lista de imagens associadas ao serviço" })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    images: ServiceImage[];
}
