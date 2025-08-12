import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ServiceService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("services")
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() dto: CreateServiceDto, @Request() req) {
        return this.serviceService.create(dto, req.user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAllByUser(@Request() req) {
        return this.serviceService.findAll(req.user.id);
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.serviceService.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() dto: UpdateServiceDto) {
        return this.serviceService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.serviceService.remove(id);
    }
}