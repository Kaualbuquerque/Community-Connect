import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({
    example: 2,
    description: 'ID do usuário com quem a conversa será iniciada',
  })
  @IsNumber()
  participantId: number;
}
