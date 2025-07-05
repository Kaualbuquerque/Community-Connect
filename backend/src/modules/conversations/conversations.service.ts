import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation } from "./conversation.entity";
import { ConversationParticipant } from "./conversation-participant.entity";
import { Repository } from "typeorm";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,
        @InjectRepository(ConversationParticipant)
        private participantRepository: Repository<ConversationParticipant>,
    ) { }

    async create(dto: CreateConversationDto): Promise<Conversation> {
        const conversation = this.conversationRepository.create();
        await this.conversationRepository.save(conversation);

        const participant = dto.participantIds.map(userId => this.participantRepository.create({
            conversation: { id: conversation.id },
            user: { id: userId }
        }));

        await this.participantRepository.save(participant);

        return this.findOne(conversation.id);
    }

    findAll(): Promise<Conversation[]> {
        return this.conversationRepository.find({
            relations: ['participants', 'participants.user', 'messages'],
        });
    }

    async findOne(id: number): Promise<Conversation> {
        const conv = await this.conversationRepository.findOne({
            where: { id },
            relations: ['participants', 'participants.user', 'messages'],
        });
        if (!conv) throw new NotFoundException(`Conversation #${id} not found`);
        return conv;
    }

    async remove(id: number): Promise<void> {
        const res = await this.conversationRepository.delete(id);
        if (res.affected === 0) throw new NotFoundException(`Conversation #${id} not found`);
    }
}