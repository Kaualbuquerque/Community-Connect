import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { User } from "../users/user.entity";
import { Favorite } from "../favorites/favorite.entity";
import { ServiceImage } from "../services_images/serviceImage.entity";
import { ServiceWithImageUrls } from "./dto/service-with-image-urls.dto";

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        @InjectRepository(ServiceImage)
        private serviceImageRepository: Repository<ServiceImage>
    ) { }

    async create(dto: CreateServiceDto, user: User, files?: Express.Multer.File[]): Promise<Service> {
        const service = this.serviceRepository.create({
            ...dto,
            provider: user,
            city: user.city,
            state: user.state,
        });

        await this.serviceRepository.save(service);

        if (files?.length) {
            const urls = files.map(file => `/uploads/${file.filename}`);

            // criação dos objetos e save sendo executados em paralelo
            const images = urls.map((url, idx) =>
                this.serviceImageRepository.create({
                    url,
                    position: idx + 1,
                    service
                })
            );

            await this.serviceImageRepository.save(images);
            service.images = images;
        }

        return service;
    }


    async findAllByUser(userId: number): Promise<ServiceWithImageUrls[]> {
        const services = await this.serviceRepository.find({
            where: { provider: { id: userId } },
            relations: ['provider', 'images'],
        });

        return services.map(service => ({
            ...service,
            images: service.images?.map(img => img.url) ?? [],
        }));
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOne({
            where: { id },
            relations: ['provider'],
        });

        if (!service) throw new NotFoundException(`Service with id ${id} not found`);
        return service;
    }

    async findAllWithFavorite(
        userId?: number,
        filters?: {
            state?: string;
            city?: string;
            category?: string;
            minPrice?: number;
            maxPrice?: number;
            search?: string;
        },
    ) {
        const query = this.serviceRepository
            .createQueryBuilder('service')
            .leftJoinAndSelect('service.provider', 'provider')
            .leftJoinAndSelect('service.images', 'images');

        if (filters?.state) {
            query.andWhere('service.state = :state', { state: filters.state });
        }

        if (filters?.city) {
            query.andWhere('service.city = :city', { city: filters.city });
        }

        if (filters?.category) {
            query.andWhere('service.category = :category', { category: filters.category });
        }

        if (filters?.minPrice !== undefined) {
            query.andWhere('service.price >= :minPrice', { minPrice: filters.minPrice });
        }

        if (filters?.maxPrice !== undefined) {
            query.andWhere('service.price <= :maxPrice', { maxPrice: filters.maxPrice });
        }

        if (filters?.search) {
            query.andWhere(
                '(LOWER(service.name) LIKE LOWER(:search) OR LOWER(service.description) LIKE LOWER(:search))',
                { search: `%${filters.search}%` },
            );
        }

        const services = await query.getMany();

        const servicesWithImages = services.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description,
            state: service.state,
            city: service.city,
            category: service.category,
            price: service.price,
            provider: service.provider,
            images: service.images?.map(img => img.url) ?? [],
        }));

        // Sem usuário logado
        if (!userId) {
            return servicesWithImages.map(service => ({
                ...service,
                isFavorite: false,
            }));
        }

        // Busca paralela: serviços e favoritos
        const favorites = await this.favoriteRepository.find({
            where: { consumer: { id: userId } },
            relations: ['service'],
        });

        const favoriteIds = new Set(favorites.map(f => f.service.id));

        return servicesWithImages.map(service => ({
            ...service,
            isFavorite: favoriteIds.has(service.id),
        }));
    }


    async update(id: number, dto: UpdateServiceDto): Promise<Service> {
        const { images, ...data } = dto;

        // paraleliza update + find
        const updatePromise = this.serviceRepository.update(id, data);
        const findPromise = this.serviceRepository.findOne({
            where: { id },
            relations: ['provider'],
        });

        const [_, updated] = await Promise.all([updatePromise, findPromise]);

        if (!updated) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        return updated;
    }

    async remove(id: number): Promise<void> {
        const result = await this.serviceRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Service #${id} not found`);
        }
    }

    async getStates(): Promise<string[]> {
        const result = await this.serviceRepository
            .createQueryBuilder('service')
            .select('DISTINCT TRIM(service.state)', 'state')
            .where('service.state IS NOT NULL')
            .getRawMany();

        return result.map((s: any) => s.state.trim().toUpperCase());
    }

    async getCitiesByState(state: string): Promise<string[]> {
        if (!state) return [];

        const result = await this.serviceRepository
            .createQueryBuilder('service')
            .select('DISTINCT TRIM(service.city)', 'city')
            .where('UPPER(TRIM(service.state)) = :state', { state: state.toUpperCase() })
            .andWhere('service.city IS NOT NULL')
            .getRawMany();

        return result.map((c: any) => c.city.trim());
    }
}
