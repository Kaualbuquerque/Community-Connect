import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import CreateFavoriteDto from "./dto/create-favorite.dto";
import { FavoriteService } from "./favorites.service";

@Controller("favorites")
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    create(@Body() dto: CreateFavoriteDto) {
        return this.favoriteService.create(dto);
    }

    @Get()
    findAll() {
        return this.favoriteService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.favoriteService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.favoriteService.remove(id);
    }
}