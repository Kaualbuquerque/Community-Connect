import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./favorite.entity";
import { Repository } from "typeorm";

interface FavoriteFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    state?: string;
    city?: string;
    search?: string;
}

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>
    ) { }

    async addFavorite(consumerId: number, serviceId: number): Promise<Favorite> {
        const existing = await this.favoriteRepository.findOne({
            where: {
                consumer: { id: consumerId },
                service: { id: serviceId },
            },
            relations: ["consumer", "service", "service.provider"],
        });

        if (existing) {
            return existing; // já favoritado, retorna
        }

        const favorite = this.favoriteRepository.create({
            consumer: { id: consumerId },
            service: { id: serviceId },
        });

        return this.favoriteRepository.save(favorite);
    }

    async findByConsumer(consumerId: number): Promise<Favorite[]> {
        const favorites = await this.favoriteRepository
            .createQueryBuilder('favorite')
            .leftJoinAndSelect('favorite.consumer', 'consumer')
            .leftJoinAndSelect('favorite.service', 'service')
            .leftJoinAndSelect('service.images', 'images')
            .leftJoinAndSelect('service.provider', 'provider')
            .where('consumer.id = :consumerId', { consumerId })
            .orderBy('favorite.createdAt', 'DESC')
            .getMany();

        // Mapeia para garantir consistência com o histórico (inclui isFavorite)
        return favorites.map(favorite => ({
            ...favorite,
            service: {
                ...favorite.service,
                images: favorite.service.images ?? [],
                isFavorite: true, // sempre true para favoritos
            },
        }));
    }



    async removeFavorite(consumerId: number, serviceId: number): Promise<void> {
        const favorite = await this.favoriteRepository.findOne({
            where: {
                consumer: { id: consumerId },
                service: { id: serviceId },
            },
        });

        if (!favorite) throw new NotFoundException("Favorite not found");

        await this.favoriteRepository.remove(favorite);
    }

}