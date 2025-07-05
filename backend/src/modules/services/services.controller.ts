import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ServiceService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update0service.dto";

@Controller("services")
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    create(@Body() dto: CreateServiceDto) {
        return this.serviceService.create(dto);
    }

    @Get()
    findAll() {
        return this.serviceService.findAll();
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