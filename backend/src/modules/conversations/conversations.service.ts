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

        @InjectRepository(ConversationParticipant)
        private participantRepository: Repository<ConversationParticipant>,

        private readonly dataSource: DataSource
    ) { }

    async create(dto: CreateConversationDto, userId: number): Promise<Conversation> {
        return await this.dataSource.transaction(async manager => {
            const conversationRepo = manager.getRepository(Conversation);
            const participantRepo = manager.getRepository(ConversationParticipant);

            const existingConversation = await conversationRepo
                .createQueryBuilder("c")
                .innerJoin("c.participants", "p1", "p1.userId = :userId", { userId })
                .innerJoin("c.participants", "p2", "p2.userId = :participantId", { participantId: dto.participantId })
                .leftJoinAndSelect("c.participants", "allParticipants")
                .getOne();

            if (existingConversation) {
                const participant = await participantRepo.findOne({
                    where: { conversation: { id: existingConversation.id }, user: { id: userId } },
                });

                if (participant && participant.deleted) {
                    participant.deleted = false;
                    await participantRepo.save(participant);
                }

                return existingConversation;
            }

            const conversation = conversationRepo.create();
            await conversationRepo.save(conversation);

            // Adiciona os participantes
            const participants = [
                participantRepo.create({ conversation, user: { id: userId }, deleted: false }),
                participantRepo.create({ conversation, user: { id: dto.participantId }, deleted: false }),
            ];

            await participantRepo.save(participants);

            const result = await conversationRepo.findOne({
                where: { id: conversation.id },
                relations: ['participants', 'participants.user'],
            });

            if (!result) throw new Error(`Conversation with id ${conversation.id} not found`);

            return result;
        });
    }



    findAll(): Promise<Conversation[]> {
        return this.conversationRepository.find({
            relations: ['participants', 'participants.user'],
        });
    }

    async findOne(userId: number) {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'participant')
            .leftJoinAndSelect('participant.user', 'user')
            .leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
            .where('participant.userId = :userId', { userId })
            .andWhere('participant.deleted = false')
            .getMany();
    }

    async remove(conversationId: number, userId: number) {
        const participant = await this.participantRepository.findOne({
            where: {
                conversation: { id: conversationId },
                user: { id: userId },
            },
            relations: ['conversation'],
        });

        if (!participant) {
            throw new NotFoundException('Conversa não encontrada.');
        }

        // Marca como deletada só para o usuário atual
        participant.deleted = true;
        await this.participantRepository.save(participant);

        // Verifica se ambos deletaram → apaga completamente
        const allDeleted = await this.participantRepository.count({
            where: {
                conversation: { id: conversationId },
                deleted: false,
            },
        });

        if (allDeleted === 0) {
            await this.conversationRepository.delete(conversationId);
        }

        return { message: 'Conversa deletada com sucesso.' };
    }

}