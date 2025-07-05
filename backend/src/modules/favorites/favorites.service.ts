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

    async create(dto: CreateFavoriteDto): Promise<Favorite> {
        const favorite = this.favoriteRepository.create({
            consumer: { id: dto.consumerId },
            service: { id: dto.serviceId }
        });
        return this.favoriteRepository.save(favorite);
    }

    async findAll(): Promise<Favorite[]> {
        return this.favoriteRepository.find();
    }

    async findOne(id: number): Promise<Favorite> {
        const favorite = await this.favoriteRepository.findOne({
            where: { id },
            relations: ["consumer", "provider"]
        });
        if (!favorite) throw new NotFoundException(`Favorite #${id} not found`);
        return favorite;
    }

    async remove(id: number): Promise<void> {
        const result = await this.favoriteRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Favorite #${id} not found`);
    }

}