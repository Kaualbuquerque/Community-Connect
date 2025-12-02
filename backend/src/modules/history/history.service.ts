import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHistoryDto } from "./dto/create-service-history.dto";
import { History } from "./history.entity";
import { Favorite } from "../favorites/favorite.entity";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History)
        private historyRepository: Repository<History>,

        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
    ) {}

    async create(dto: CreateHistoryDto): Promise<History> {
        const { consumerId, serviceId, usedAt } = dto;
        const MAX_HISTORY = 5;

        // Busca registro existente e quantidade FINAL em paralelo
        const [existing, currentCount] = await Promise.all([
            this.historyRepository.findOne({
                where: {
                    consumer: { id: consumerId },
                    service: { id: serviceId },
                },
            }),
            this.historyRepository.count({
                where: { consumer: { id: consumerId } },
            }),
        ]);

        // Remove se já existe, mantendo sempre o mais novo no topo
        if (existing) {
            await this.historyRepository.delete(existing.id);
        }

        // Se atingir limite, remover mais antigo
        if (currentCount >= MAX_HISTORY) {
            const oldest = await this.historyRepository.findOne({
                where: { consumer: { id: consumerId } },
                order: { usedAt: "ASC" },
            });
            if (oldest) {
                await this.historyRepository.delete(oldest.id);
            }
        }

        // Cria novo registro
        const record = this.historyRepository.create({
            usedAt: usedAt ? new Date(usedAt) : new Date(),
            consumer: { id: consumerId },
            service: { id: serviceId },
        });

        return this.historyRepository.save(record);
    }


    async findByConsumer(consumerId: number): Promise<any[]> {
        // Rodar histórico + favoritos em paralelo
        const [histories, favorites] = await Promise.all([
            this.historyRepository
                .createQueryBuilder('history')
                .leftJoinAndSelect('history.consumer', 'consumer')
                .leftJoinAndSelect('history.service', 'service')
                .leftJoinAndSelect('service.images', 'images')
                .leftJoinAndSelect('service.provider', 'provider')
                .where('consumer.id = :consumerId', { consumerId })
                .orderBy('history.usedAt', 'DESC')
                .getMany(),

            this.favoriteRepository.find({
                where: { consumer: { id: consumerId } },
                relations: ['service'],
            }),
        ]);

        const favoriteIds = new Set(favorites.map(f => f.service.id));

        // Formatação final
        return histories.map(history => {
            const service = history.service;

            return {
                ...history,
                service: {
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    state: service.state,
                    city: service.city,
                    category: service.category,
                    price: service.price,
                    provider: service.provider,
                    images: service.images?.map(image => image.url) ?? [],
                    isFavorite: favoriteIds.has(service.id),
                },
            };
        });
    }


    async remove(id: number): Promise<void> {
        const result = await this.historyRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`History record #${id} not found`);
        }
    }
}