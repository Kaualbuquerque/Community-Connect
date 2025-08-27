import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./favorite.entity";
import { Repository } from "typeorm";
import CreateFavoriteDto from "./dto/create-favorite.dto";
import { Service } from "../services/service.entity";

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

    async findByUser(userId: number): Promise<Service[]> {
        const favorites = await this.favoriteRepository.find({
            where: { consumer: { id: userId } }, relations: ["service", "service.provider"],
        });

        return favorites.map(fav => ({ ...fav.service, isFavorite: true, }));
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