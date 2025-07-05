import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "../conversations/conversation.entity";
import { User } from "../users/user.entity";

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column('text')
  content: string;

  @ManyToOne(() => Conversation, conv => conv.messages)
  conversation: Conversation;

  @ManyToOne(() => User, user => user.messages)
  sender: User;
}