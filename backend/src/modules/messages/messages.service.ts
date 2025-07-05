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
        const sender = await this.usersRepository.findOneBy({ id: dto.senderId });
        const conversation = await this.conversationsRepository.findOneBy({ id: dto.conversationId });

        if (!sender || !conversation) throw new NotFoundException('Sender or conversation not found');

        const message = this.messageRepository.create({
            content: dto.content,
            sender,
            conversation,
        });
        return this.messageRepository.save(message);
    }

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({ relations: ['sender', 'conversation'] });
    }

    async findOne(id: number): Promise<Message> {
        return this.messageRepository.findOne({ where: { id }, relations: ['sender', 'conversation'] })
            .then(message => {
                if (!message) throw new NotFoundException(`Message with id ${id} not found`);
                return message;
            });
    }

    async remove(id: number): Promise<void> {
        const result = await this.messageRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Message #${id} not found`);
    }
}