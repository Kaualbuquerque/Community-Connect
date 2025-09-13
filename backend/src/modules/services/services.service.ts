import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { User } from "../users/user.entity";
import { Favorite } from "../favorites/favorite.entity";

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>
    ) { }


    async create(dto: CreateServiceDto, user: User, files?: Express.Multer.File[]): Promise<Service> {
        const images: Buffer[] = files ? files.map(file => file.buffer) : [];

        const service = this.serviceRepository.create({
            ...dto,
            provider: user,
            location: `${user.city} - ${user.state}`,
            images,
        });

        return this.serviceRepository.save(service);
    }

    async findAllByUsers(userId: number): Promise<Service[]> {
        return this.serviceRepository.find({
            where: { provider: { id: userId } },
            relations: ['provider'],
        });
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOne({
            where: { id },
            relations: ['provider'],
        });
        if (!service) throw new NotFoundException(`Service with id ${id} not found`);
        return service;
    }

    async findAllWithFavorite(userId?: number) {
        const services = await this.serviceRepository.find({
            relations: ["provider"],
        });

        // Converte imagens buffer → base64
        const servicesWithImages = services.map(service => ({
            ...service,
            images: service.images?.map(img => img) ?? [],
        }));

        if (!userId) {
            return servicesWithImages.map(service => ({
                ...service,
                isFavorite: false
            }));
        }

        const favorites = await this.favoriteRepository.find({
            where: { consumer: { id: userId } },
            relations: ["service"],
        });

        const favoriteIds = favorites.map(fav => fav.service.id);

        return servicesWithImages.map(service => ({
            ...service,
            isFavorite: favoriteIds.includes(service.id),
        }));
    }

    async update(id: number, dto: UpdateServiceDto): Promise<Service> {
        await this.serviceRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.serviceRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Service #${id} not found`);
    }

}
