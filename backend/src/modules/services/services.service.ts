import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update0service.dto";

@Injectable()
export class ServiceService {

    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>
    ) { }

    async create(dto: CreateServiceDto): Promise<Service> {
        const service = this.serviceRepository.create(dto);
        return this.serviceRepository.save(service);
    }

    async findAll(): Promise<Service[]> {
        return this.serviceRepository.find();
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOneBy({ id });
        if (!service) throw new NotFoundException(`Service with id ${id} not found`);
        return service;
    }

    async update(id: number, dto: UpdateServiceDto): Promise<Service> {
        await this.serviceRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const result = await this.serviceRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException(`Service #${id} not found`);
    }
}