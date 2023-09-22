import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperheroEntity } from '../database/models/superhero.model';
import { ISuperhero } from '../interfaces/superhero.interface';
import { Repository } from 'typeorm';

@Injectable()
export class SuperHeroService {
    constructor(@InjectRepository(SuperheroEntity) private superheroRepository: Repository<SuperheroEntity>) { }

    async getAllHero(): Promise<SuperheroEntity[]> {
        return this.superheroRepository.find();
    }

    async getHeroById(id: number): Promise<SuperheroEntity> {
        const superhero = await this.superheroRepository.findOneBy({ id });

        if (!superhero) {
            throw new NotFoundException(`Superhero with ID ${id} not found`);
        }

        return superhero;
    }

    async createHero(superhero: ISuperhero): Promise<SuperheroEntity> {
        return this.superheroRepository.save(superhero);
    }

    async updateHero(id: number, superhero: ISuperhero): Promise<SuperheroEntity> {
        const existingHero = await this.getHeroById(id);

        if (existingHero) {
            await this.superheroRepository.update(id, superhero);
            return this.getHeroById(id);
        } else {
            throw new NotFoundException(`Superhero with ID ${id} not found`);
        }
    }

    async deleteHero(id: number): Promise<{ id: number }> {
        const existingHero = await this.getHeroById(id);
        if (existingHero) {
            await this.superheroRepository.delete(id);
            return { id: id };
        } else {
            throw new NotFoundException(`Superhero with ID ${id} not found`);
        }
    }

}