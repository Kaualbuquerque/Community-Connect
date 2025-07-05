import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConversationParticipant } from "./conversation-participant.entity";
import { Message } from "../messages/message.entity";

@Entity('conversations')
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Message, msg => msg.conversation)
    messages: Message[];

    @OneToMany(() => ConversationParticipant, cp => cp.conversation)
    participants: ConversationParticipant[];
}