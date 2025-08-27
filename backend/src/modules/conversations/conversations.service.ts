import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation } from "./conversation.entity";
import { ConversationParticipant } from "./conversation-participant.entity";
import { DataSource, Repository } from "typeorm";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,

        private readonly dataSource: DataSource
    ) { }

    async create(dto: CreateConversationDto, userId: number): Promise<Conversation> {
        return await this.dataSource.transaction(async manager => {
            const conversation = manager.create(Conversation);
            await manager.save(conversation);

            const participants = [
                manager.create(ConversationParticipant, { conversation, user: { id: userId } }),
                manager.create(ConversationParticipant, { conversation, user: { id: dto.participantId } }),
            ];
            await manager.save(participants);

            // Garantindo não-null
            const result = await manager.findOne(Conversation, {
                where: { id: conversation.id },
                relations: ['participants', 'messages'],
            });

            if (!result) throw new Error(`Conversation with id ${conversation.id} not found`);

            return result;
        });
    }

    findAll(): Promise<Conversation[]> {
        return this.conversationRepository.find({
            relations: ['participants', 'participants.user', 'messages'],
        });
    }

    async findOne(id: number): Promise<Conversation> {
        const conversation = await this.conversationRepository.findOne({
            where: { id },
            relations: ['participants', 'messages'],
        });

        if (!conversation) {
            throw new NotFoundException(`Conversation with id ${id} not found`);
        }

        return conversation;
    }

    async remove(id: number): Promise<void> {
        const res = await this.conversationRepository.delete(id);
        if (res.affected === 0) throw new NotFoundException(`Conversation #${id} not found`);
    }
}