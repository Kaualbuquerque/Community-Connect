// src/modules/conversations/dto/create-conversation.dto.ts
import { IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  participantIds: number[];
}
