import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHistoryDto } from "./dto/create-service-history.dto";
import { History } from "./history.entity";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History)
        private historyRepository: Repository<History>,
    ) { }

    async create(dto: CreateHistoryDto): Promise<History> {
        const { consumerId, serviceId, usedAt } = dto;

        // Exemplo de limite cíclico (opcional)
        const MAX_HISTORY = 5;
        const count = await this.historyRepository.count({
            where: { consumer: { id: consumerId } },
        });

        if (count >= MAX_HISTORY) {
            const oldest = await this.historyRepository.findOne({
                where: { consumer: { id: consumerId } },
                order: { usedAt: "ASC" },
            });
            if (oldest) await this.historyRepository.delete(oldest.id);
        }

        // Cria o registro, preenchendo a data atual caso não seja enviada
        const record = this.historyRepository.create({
            usedAt: usedAt ? new Date(usedAt) : new Date(),
            consumer: { id: consumerId },
            service: { id: serviceId },
        });

        return this.historyRepository.save(record);
    }

    async findByConsumer(consumerId: number): Promise<History[]> {
        return this.historyRepository.find({
            where: { consumer: { id: consumerId } },
            relations: ['service', 'consumer'],  // 🔹 adicionar as relações
            order: { usedAt: "DESC" }
        });
    }

    async remove(id: number): Promise<void> {
        const result = await this.historyRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`History record #${id} not found`)
    }
}