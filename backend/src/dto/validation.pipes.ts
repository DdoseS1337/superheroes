import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import Joi from "joi";



@Injectable()
export class SuperHeroValidationPipe implements PipeTransform {
    constructor(private schema: Joi.ObjectSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}