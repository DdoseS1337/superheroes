import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperHeroController } from '../controllers/superhero.controller';
import { SuperheroEntity } from '../database/models/superhero.model';
import { SuperHeroValidationService } from '../dto/dto.superhero';
import { SuperHeroService } from '../services/superhero.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperheroEntity])],
  controllers: [SuperHeroController],
  providers: [SuperHeroService, SuperHeroValidationService],
})
export class SuperHeroModule { }
