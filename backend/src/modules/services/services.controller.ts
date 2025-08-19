import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ServiceService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("services")
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateServiceDto, @Request() req) {
        return this.serviceService.create(dto, req.user);
    }

    @Get()
    getAllServices() {
        return this.serviceService.findAll();
    }

    @Get('my-services')
    @UseGuards(JwtAuthGuard)
    findAllByUser(@Request() req) {
        return this.serviceService.findAllByUsers(req.user.id);
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    findOne(@Param("id") id: number) {
        return this.serviceService.findOne(id);
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