import { Test, TestingModule } from '@nestjs/testing';
import { SuperHeroValidationPipe } from '../dto/validation.pipes';
import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuperheroEntity } from '../database/models/superhero.model';
import { superheroSchema } from '../dto/superhero.dto';

const fakeSuperHeroValidationPipe = {
  transform: jest.fn(),
};

describe('SuperHeroValidationPipe', () => {
  let superHeroValidationPipe: SuperHeroValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SuperHeroValidationPipe,
          useValue: new SuperHeroValidationPipe(superheroSchema),
        },
        {
          provide: 'Joi.ObjectSchema',
          useValue: superheroSchema,
        },
      ],
    }).compile();

    superHeroValidationPipe = module.get<SuperHeroValidationPipe>(
      SuperHeroValidationPipe,
    );
  });

  it('should be defined', () => {
    expect(superHeroValidationPipe).toBeDefined();
  });

  it('should validate data successfully', () => {
    const data = {
      nickname: 'kekov',
      real_name: 'kekovich kek',
      origin_description: 'love big pencils',
      superpowers: ['smart', 'power'],
      catch_phrase: 'letsgobaby',
      heroimages: ['resr'],
    };

    expect(() =>
      superHeroValidationPipe.transform(data, {
        type: 'body',
        metatype: Object,
      }),
    ).not.toThrow();
  });

  it('should throw BadRequestException on invalid data', () => {
    const invalidData = { nickname: 'kekov' };

    expect(() =>
      superHeroValidationPipe.transform(invalidData, {
        type: 'body',
        metatype: Object,
      }),
    ).toThrow(BadRequestException);
  });
});
