import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>
    ) { }

    async create(dto: CreateServiceDto, user: User): Promise<Service> {
        const service = this.serviceRepository.create({
            ...dto,
            provider: user,
            location: `${user.city} - ${user.state}`,
        });

        return this.serviceRepository.save(service);
    }

    async findAll(): Promise<Service[]> {
        try {
            return await this.serviceRepository.find({
                relations: ['provider'],
            });
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            return [];
        }

    }

    async findAllByUsers(userId: number): Promise<Service[]> {
        return this.serviceRepository.find({
            where: { provider: { id: userId } }, // filtra pelo id do provider
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

    async update(id: number, dto: UpdateServiceDto): Promise<Service> {
        await this.serviceRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.serviceRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Service #${id} not found`);
    }
}