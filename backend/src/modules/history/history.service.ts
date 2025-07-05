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
        const record = this.historyRepository.create({
            usedAt: dto.usedAt,
            consumer: { id: dto.consumerId },
            service: { id: dto.serviceId }
        })
        return this.historyRepository.save(record);
    }

    findAll(): Promise<History[]> {
        return this.historyRepository.find();
    }

    async findOne(id: number): Promise<History> {
        const record = await this.historyRepository.findOneBy({ id })
        if (!record) throw new NotFoundException(`History record #${id} not found`)
        return record;
    }

    async remove(id: number): Promise<void> {
        const result = await this.historyRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`History record #${id} not found`)
    }
}