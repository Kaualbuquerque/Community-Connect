import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    images: Buffer[];
}
