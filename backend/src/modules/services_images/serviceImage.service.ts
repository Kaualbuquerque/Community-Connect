import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceImage } from "./serviceImage.entity";
import { DeepPartial, Repository } from "typeorm";
import { Service } from "../services/service.entity";
import { UpdateServiceDto } from "../services/dto/update-service.dto";
import { User } from "../users/user.entity";
import { Readable } from "stream";
import type { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ServiceImageService {
    constructor(
        @InjectRepository(ServiceImage)
        private readonly imageRepository: Repository<ServiceImage>,

        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,

        @Inject('CLOUDINARY')
        private readonly cloudinary: typeof import('cloudinary').v2,
    ) { }

    private uploadToCloudinary(buffer: Buffer): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                { folder: 'community_connect/services' },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Upload failed'));
                    resolve(result);
                }
            );

            Readable.from(buffer).pipe(uploadStream);
        });
    }

    async addImage(serviceId: number, file: Express.Multer.File): Promise<ServiceImage> {
        const count = await this.imageRepository.count({ where: { service: { id: serviceId } } });
        if (count >= 5) {
            throw new BadRequestException('Limit of 5 images per service reached');
        }

        const uploadResult = await this.uploadToCloudinary(file.buffer);

        const image = this.imageRepository.create({
            service: { id: serviceId } as any,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            position: count + 1,
        });

        return await this.imageRepository.save(image);
    }

    async getImageByService(serviceId: number): Promise<ServiceImage[]> {
        return await this.imageRepository.find({
            where: { service: { id: serviceId } },
            order: { position: "ASC" }
        });
    }

    async updateImages(
        id: number,
        dto: UpdateServiceDto,
        user: User,
        files?: Express.Multer.File[],
    ): Promise<Service> {

        const service = await this.serviceRepository.findOne({
            where: { id, provider: { id: user.id } },
            relations: ['images'],
        });

        if (!service) {
            throw new NotFoundException('Service not found or does not belong to this user!');
        }

        Object.assign(service, dto);

        if (files?.length) {
            if (files.length > 5) {
                throw new BadRequestException('Maximum limit of 5 images reached!');
            }

            // 1. Deleção paralela das imagens antigas
            if (service.images.length > 0) {
                await Promise.all(
                    service.images.map(img => {
                        if (img.public_id) {
                            return this.cloudinary.uploader.destroy(img.public_id);
                        }
                        return Promise.resolve();
                    }),
                );

                await this.imageRepository.remove(service.images);
            }

            // 2. Upload paralelo das novas imagens
            const uploaded = await Promise.all(
                files.map(file => this.uploadToCloudinary(file.buffer))
            );

            // 3. Criação dos registros
            const newImages = uploaded.map((upload, idx) =>
                this.imageRepository.create({
                    url: upload.secure_url,
                    public_id: upload.public_id,
                    position: idx + 1,
                    service,
                } as DeepPartial<ServiceImage>)
            );

            await this.imageRepository.save(newImages);
            service.images = newImages;
        }

        return await this.serviceRepository.save(service);
    }

    async deleteImage(id: number): Promise<void> {
        const image = await this.imageRepository.findOne({ where: { id } });
        if (!image) throw new NotFoundException('Image not found');

        if (image.public_id) {
            await this.cloudinary.uploader.destroy(image.public_id);
        }

        await this.imageRepository.delete(id);
    }
}