import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServiceService } from './services.service';
import { Service } from './service.entity';
import { Favorite } from '../favorites/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Favorite])],
  controllers: [ServicesController],
  providers: [ServiceService],
})
export class ServicesModule {}