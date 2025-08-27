import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "../conversations/conversation.entity";
import { User } from "../users/user.entity";

@Index(['conversationId', 'timestamp'])
@Index(['senderId'])
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversationId: number;

  @Column()
  senderId: number;

  @ManyToOne(() => Conversation, conv => conv.messages)
  @JoinColumn({ name: "conversationId" })
  conversation: Conversation;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @CreateDateColumn()
  timestamp: Date;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: ['sent', 'delivered', 'read'], default: 'sent' })
  status: 'sent' | 'delivered' | 'read';

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  editedAt?: Date;
}