// src/modules/conversation/conversation.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation } from "./conversation.entity";
import { ConversationParticipant } from "./conversation-participant.entity";
import { DataSource, In, Repository } from "typeorm";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,

        private readonly dataSource: DataSource,
    ) { }

    /**
     * Cria uma conversa entre userId e dto.participantId.
     * - Reutiliza conversa existente se houver.
     * - Reativa participantes deletados.
     * - Cria participantes novos em batch.
     */
    async create(dto: CreateConversationDto, userId: number): Promise<Conversation> {
        return await this.dataSource.transaction(async manager => {
            const conversationRepo = manager.getRepository(Conversation);
            const participantRepo = manager.getRepository(ConversationParticipant);

            // Verifica se já existe uma conversa entre os dois usuários
            const existingConversation = await conversationRepo
                .createQueryBuilder("c")
                .innerJoin("c.participants", "p1", "p1.userId = :userId", { userId })
                .innerJoin("c.participants", "p2", "p2.userId = :participantId", { participantId: dto.participantId })
                .leftJoinAndSelect("c.participants", "allParticipants")
                .getOne();

            if (existingConversation) {
                // Reativa participantes que estavam deletados — atualizar em batch
                const toReactivate = existingConversation.participants.filter(p => p.deleted);
                if (toReactivate.length > 0) {
                    toReactivate.forEach(p => (p.deleted = false));
                    await participantRepo.save(toReactivate);
                }
                return existingConversation;
            }

            // Cria nova conversa
            const conversation = conversationRepo.create();
            const savedConversation = await conversationRepo.save(conversation);

            // Adiciona participantes, evitando duplicação
            const participantIds = [userId, dto.participantId];

            // Busca participantes já existentes para esta conversa e esses userIds (deveria ser vazio logo após criar, mas mantemos a checagem)
            const existingParticipants = await participantRepo.find({
                where: {
                    conversation: { id: savedConversation.id },
                    user: { id: In(participantIds) },
                },
            });

            const existingUserIds = new Set(existingParticipants.map(p => p.user.id));

            // Reativar participantes existentes que estavam marcados como deleted
            const toUpdate: ConversationParticipant[] = [];
            for (const p of existingParticipants) {
                if (p.deleted) {
                    p.deleted = false;
                    toUpdate.push(p);
                }
            }

            // Criar novos participantes (apenas para ids que não existiam)
            const toCreate: ConversationParticipant[] = [];
            for (const id of participantIds) {
                if (!existingUserIds.has(id)) {
                    const newParticipant = participantRepo.create({
                        conversation: { id: savedConversation.id } as any,
                        user: { id },
                        deleted: false,
                    } as Partial<ConversationParticipant>);
                    toCreate.push(newParticipant);
                }
            }

            // Salva atualizações e criações em paralelo (batch saves)
            await Promise.all([
                toUpdate.length > 0 ? participantRepo.save(toUpdate) : Promise.resolve(),
                toCreate.length > 0 ? participantRepo.save(toCreate) : Promise.resolve(),
            ]);

            // Retorna conversa completa com participantes
            const result = await conversationRepo.findOne({
                where: { id: savedConversation.id },
                relations: ['participants', 'participants.user'],
            });

            if (!result) throw new Error(`Conversation with id ${savedConversation.id} not found`);

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

    /**
     * Marca participante como deleted=true para o usuário.
     * Se todos os participantes estão marcados como deleted, remove a conversa.
     */
    async remove(conversationId: number, userId: number) {
        // Mantive a mesma semântica, mas faço as operações em transação para evitar race conditions
        return await this.dataSource.transaction(async manager => {
            const participantRepo = manager.getRepository(ConversationParticipant);
            const conversationRepo = manager.getRepository(Conversation);

            const participant = await participantRepo.findOne({
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
            await participantRepo.save(participant);

            // Verifica se ainda existe algum participante não-deleted
            const remaining = await participantRepo.count({
                where: {
                    conversation: { id: conversationId },
                    deleted: false,
                },
            });

            if (remaining === 0) {
                await conversationRepo.delete(conversationId);
            }

            return { message: 'Conversa deletada com sucesso.' };
        });
    }
}