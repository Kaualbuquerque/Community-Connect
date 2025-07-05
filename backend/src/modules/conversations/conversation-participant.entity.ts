import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "../users/user.entity";

@Entity('conversation_participants')
export class ConversationParticipant {
  @PrimaryColumn()
  conversationId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Conversation, conv => conv.participants)
  conversation: Conversation;

  @ManyToOne(() => User, user => user.conversations)
  user: User;
}