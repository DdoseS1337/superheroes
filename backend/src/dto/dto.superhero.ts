import { Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import { ISuperhero } from "src/interfaces/superhero.interface";

export const superheroSchema = Joi.object({
    id: Joi.string().optional(),
    nickname: Joi.string().required(),
    real_name: Joi.string().required(),
    origin_description: Joi.string().required(),
    superpowers: Joi.array().items(Joi.string()).required(),
    catch_phrase: Joi.string().required(),
    heroimages: Joi.array().items(Joi.string()).required(),
});

@Injectable()
export class SuperHeroValidationService {
    validateSuperhero(superhero: ISuperhero): boolean {
        const { error } = superheroSchema.validate(superhero);
        return !error;
    }
}