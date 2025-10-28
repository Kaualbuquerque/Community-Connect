import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ServiceImageService } from "./serviceImage.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/configs/multer.config";
import { UpdateServiceDto } from "../services/dto/update-service.dto";
import { User } from "../users/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Request } from "express";

@Controller("service-images")
export class ServiceImageController {
    constructor(private readonly serviceImageService: ServiceImageService) { }

    @Post(':serviceId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('serviceId', ParseIntPipe) serviceId: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado');
        }
        // Chama o service para fazer upload no Cloudinary
        const image = await this.serviceImageService.addImage(serviceId, file);
        // Retorna a URL e o ID da imagem
        return {
            id: image.id,
            url: image.url,
            position: image.position,
        };
    }


    @Get(':serviceId')
    async getImages(@Param('serviceId', ParseIntPipe) serviceId: number) {
        const images = await this.serviceImageService.getImageByService(serviceId);

        // Retorna somente dados necessários
        return images.map((img) => ({
            id: img.id,
            url: img.url,
            position: img.position,
        }));
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':serviceId')
    @UseInterceptors(FilesInterceptor('files', 5))
    async updateImages(
        @Param('serviceId', ParseIntPipe) serviceId: number,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: UpdateServiceDto,
        @Req() req: Request,
    ) {
        const user = req.user as User;

        const updatedService = await this.serviceImageService.updateImages(serviceId, dto, user, files);

        // Retorna apenas os dados relevantes das imagens
        return {
            ...updatedService,
            images: updatedService.images.map((img) => ({
                id: img.id,
                url: img.url,
                position: img.position,
            })),
        };
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.serviceImageService.deleteImage(id);
        return { message: 'Imagem deletada com sucesso' };
    }
}