import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import CreateFavoriteDto from "./dto/create-favorite.dto";
import { FavoriteService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("favorites")
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addFavorite(@Request() req, @Body() dto: CreateFavoriteDto) {
        return this.favoriteService.addFavorite(req.user.id, dto.serviceId);
    }

    @Delete(':serviceId')
    @UseGuards(JwtAuthGuard)
    async removeFavorite(@Request() req, @Param('serviceId') serviceId: string) {
        return this.favoriteService.removeFavorite(req.user.id, +serviceId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getFavorites(@Request() req) {
        return this.favoriteService.getFavorite(req.user.id);
    }
}