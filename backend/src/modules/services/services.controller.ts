import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ServiceService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OptionalJwtAuthGuard } from "../auth/guards/optional-jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";


@Controller("services")
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images', 5))
    async createService(@UploadedFiles() files: Express.Multer.File[], @Body() body: CreateServiceDto, @Request() req) {
        return this.serviceService.create(body, req.user, files);
    }

    @Get()
    @UseGuards(OptionalJwtAuthGuard)
    async getAllServices(@Req() req) {
        const userId = req.user?.id;
        return this.serviceService.findAllWithFavorite(userId);
    }

    @Get('my-services')
    @UseGuards(JwtAuthGuard)
    findAllByUser(@Request() req) {
        return this.serviceService.findAllByUsers(req.user.id);
    }


    @Put(":id")
    @UseGuards(JwtAuthGuard)
    update(@Param("id") id: number, @Body() dto: UpdateServiceDto) {
        return this.serviceService.update(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Param("id") id: number) {
        return this.serviceService.remove(id);
    }
}