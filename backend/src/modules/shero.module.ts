import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperHeroController } from 'src/controllers/shero.controller';
import { SuperheroEntity } from 'src/database/models/superhero.model';
import { SuperHeroValidationService } from 'src/dto/dto.superhero';
import { SuperHeroService } from 'src/services/shero.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperheroEntity])],
  controllers: [SuperHeroController],
  providers: [SuperHeroService, SuperHeroValidationService],
})
export class SuperHeroModule { }
