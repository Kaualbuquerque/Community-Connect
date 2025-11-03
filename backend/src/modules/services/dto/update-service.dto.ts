import { PartialType } from "@nestjs/mapped-types";
import { CreateServiceDto } from "./create-service.dto";
import { IsArray, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional({
    type: [String],
    example: ["image1.jpg", "image2.jpg"],
    description: "IDs ou nomes das imagens existentes a serem mantidas ao atualizar o serviço",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  existingImages?: string[];
}
