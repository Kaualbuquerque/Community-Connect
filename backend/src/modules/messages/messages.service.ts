import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dt";
import { User } from "../users/user.entity";
import { Conversation } from "../conversations/conversation.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Conversation)
        private conversationsRepository: Repository<Conversation>,
    ) { }

    async create(dto: CreateMessageDto): Promise<Message> {
        // Busca paralela: User + Conversation
        const [sender, conversation] = await Promise.all([
            this.usersRepository.findOneBy({ id: dto.senderId }),
            this.conversationsRepository.findOneBy({ id: dto.conversationId })
        ]);

        if (!sender || !conversation) {
            throw new NotFoundException("Sender or conversation not found");
        }

        const message = this.messageRepository.create({
            content: dto.content,
            sender,
            conversation,
        });

        return this.messageRepository.save(message);
    }

    async findByConversation(
        conversationId: number,
        page: number = 1,
        limit: number = 20
    ) {
        const skip = (page - 1) * limit;

        // find + count feitos em paralelo
        const [messages, total] = await Promise.all([
            this.messageRepository.find({
                where: { conversationId },
                order: { timestamp: 'ASC' },
                skip,
                take: limit,
            }),
            this.messageRepository.count({
                where: { conversationId }
            })
        ]);

        return { total, page, limit, messages };
    }

    async remove(id: number): Promise<void> {
        const result = await this.messageRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Message #${id} not found`);
        }
    }
}