import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { SuperHeroService } from 'src/services/shero.service';
import { SuperheroEntity } from 'src/database/models/superhero.model';
import { SuperHeroValidationService } from '../dto/dto.superhero'
@Controller('superheroes')
export class SuperHeroController {
    constructor
        (
            private readonly superHeroService: SuperHeroService,
            private readonly validationService: SuperHeroValidationService
        ) { }

    @Get()
    async GetAllHero(): Promise<SuperheroEntity[]> {
        return await this.superHeroService.getAllHero();
    }

    @Get(':id')
    async GetHeroById(@Param('id') id: number) {
        return await this.superHeroService.getHeroById(id);
    }

    @Delete(':id')
    async DeleteHeroById(@Param('id') id: number) {
        return await this.superHeroService.deleteHero(id);
    }

    @Put(':id')
    async UpdateHero(@Param('id') id: number, @Body() superhero: SuperheroEntity) {
        if (this.validationService.validateSuperhero(superhero)) {
            return await this.superHeroService.updateHero(id, superhero);
        } else {
            throw new BadRequestException('Invalid superhero data');
        }

    }

    @Post()
    async CreateHero(@Body() superhero: SuperheroEntity): Promise<SuperheroEntity> {
        if (this.validationService.validateSuperhero(superhero)) {
            return await this.superHeroService.createHero(superhero);
        } else {
            throw new BadRequestException('Invalid superhero data');
        }
    }
}