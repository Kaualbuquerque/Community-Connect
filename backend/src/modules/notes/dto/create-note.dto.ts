import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty({
        example: "Lembre-se de verificar o serviço antes de contratar.",
        description: "Conteúdo da nota do usuário",
    })
    @IsNotEmpty()
    @IsString()
    content: string;
}
