import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHistoryDto {
    @ApiProperty({
        example: "2025-11-03T15:30:00.000Z",
        description: "Data e hora em que o serviço foi utilizado",
        required: true,
    })
    @IsNotEmpty()
    @IsDateString()
    usedAt?: string;

    @ApiProperty({
        example: 3,
        description: "ID do consumidor que utilizou o serviço",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    consumerId: number;

    @ApiProperty({
        example: 5,
        description: "ID do serviço utilizado",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;
}
