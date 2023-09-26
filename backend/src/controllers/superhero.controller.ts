import { BadRequestException, Body, Controller, Delete, 
    Get, Param, Post, Put, Request, UsePipes } from '@nestjs/common';
import { SuperHeroService } from '../services/superhero.service';
import { SuperheroEntity } from '../database/models/superhero.model';
import { SuperHeroValidationPipe } from '../dto/validation.pipes'
import { superheroSchema } from '../dto/superhero.dto'
@Controller('superheroes')
export class SuperHeroController {
    constructor
        (
            private readonly superHeroService: SuperHeroService,
        ) { }

    @Get()
    async GetAllHero(): Promise<SuperheroEntity[]> {
        return await this.superHeroService.getAllHero();
    }

    @Get(':id')
    async GetHeroById(@Param('id') id: number) {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException('Invalid id');
        }
        return await this.superHeroService.getHeroById(id);
    }

    @Delete(':id')
    async DeleteHeroById(@Param('id') id: number) {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException('Invalid id');
        }
        return await this.superHeroService.deleteHero(id);
    }

    @Put(':id')
    @UsePipes(new SuperHeroValidationPipe(superheroSchema))
    async UpdateHero(@Param('id') id: number, @Body() superhero: SuperheroEntity) {
        return await this.superHeroService.updateHero(id, superhero);
    }

    @Post()
    @UsePipes(new SuperHeroValidationPipe(superheroSchema))
    async CreateHero(@Body() superhero: SuperheroEntity): Promise<SuperheroEntity> {
        return await this.superHeroService.createHero(superhero);
    }
}