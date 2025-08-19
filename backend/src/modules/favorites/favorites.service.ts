import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./favorite.entity";
import { Repository } from "typeorm";
import CreateFavoriteDto from "./dto/create-favorite.dto";

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

    async findByUser(userId: number): Promise<Favorite[]> {
        return this.favoriteRepository.find({
            where: { consumer: { id: userId } },
            relations: ["service"],
        });
    }

    async getFavorite(id: number): Promise<Favorite> {
        const favorite = await this.favoriteRepository.findOne({
            where: { id },
            relations: ["consumer", "service", "service.provider"],
        });
        if (!favorite) throw new NotFoundException(`Favorite #${id} not found`);
        return favorite;
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