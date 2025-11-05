import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty({
    example: "Olá, estou interessado no serviço.",
    description: "Conteúdo da mensagem a ser enviada",
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 1,
    description: "ID da conversa à qual a mensagem pertence",
  })
  @IsNotEmpty()
  @IsNumber()
  conversationId: number;

  @ApiProperty({
    example: 2,
    description: "ID do usuário que está enviando a mensagem",
  })
  @IsNotEmpty()
  @IsNumber()
  senderId: number;
}
