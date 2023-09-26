import { Test, TestingModule } from '@nestjs/testing';
import { SuperHeroController } from '../controllers/superhero.controller';
import { BadRequestException } from '@nestjs/common';
import { SuperheroEntity } from '../database/models/superhero.model';
import { SuperHeroService } from '../services/superhero.service';
import { getRepositoryToken } from '@nestjs/typeorm';



describe('SuperHeroController', () => {
    let superHeroController: SuperHeroController;
    let superHeroService: SuperHeroService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SuperHeroController],
            providers: [
                SuperHeroService,
                {
                    provide: getRepositoryToken(SuperheroEntity),
                    useValue: {},
                },
            ],
        }).compile();

        superHeroController = module.get<SuperHeroController>(SuperHeroController);
        superHeroService = module.get<SuperHeroService>(SuperHeroService);
    });

    it('should be defined', () => {
        expect(superHeroController).toBeDefined();
    });

    it('should create a hero', async () => {
        const mockSuperhero =
            {
                "nickname": "test",
                "real_name": "sdsd dsd",
                "origin_description": "love big pussy",
                "superpowers": ["test"],
                "catch_phrase": "letsgobaby",
                "heroimages": ["test"]
            } as SuperheroEntity;

        const createHeroSpy = jest.spyOn(superHeroService, 'createHero').mockResolvedValue(mockSuperhero);

        const result = await superHeroController.CreateHero(mockSuperhero);

        expect(result).toBe(mockSuperhero);
        expect(createHeroSpy).toHaveBeenCalledWith(mockSuperhero);

    });

    it('should return a hero', async () => {
        const id = 5;
        const mockSuperhero =
            {
                "nickname": "test",
                "real_name": "sdsd dsd",
                "origin_description": "love big pussy",
                "superpowers": ["test"],
                "catch_phrase": "letsgobaby",
                "heroimages": ["test"]
            } as SuperheroEntity;

        const getHerobyIDSpy = jest.spyOn(superHeroService, 'getHeroById').mockResolvedValue(mockSuperhero);

        const result = await superHeroController.GetHeroById(id);

        expect(result).toBe(mockSuperhero);
        expect(getHerobyIDSpy).toHaveBeenCalledWith(id);

    });

    it('get hero should throw BadRequestException on invalid id', async () => {
        const invalidId = -1;
    
        try {
            await superHeroController.GetHeroById(invalidId);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
    });

    it('should update a hero', async () => {
        const id = 5;

        const mockSuperhero =
            {
                "nickname": "test",
                "real_name": "sdsd dsd",
                "origin_description": "love big pussy",
                "superpowers": ["test"],
                "catch_phrase": "letsgobaby",
                "heroimages": ["test"]
            } as SuperheroEntity;

        const updateHerobyIDSpy = jest.spyOn(superHeroService, 'updateHero').mockResolvedValue(mockSuperhero);

        const result = await superHeroController.UpdateHero(id, mockSuperhero);

        expect(result).toBe(mockSuperhero);
        expect(updateHerobyIDSpy).toHaveBeenCalledWith(id, mockSuperhero);

    });


    it('should delete a hero', async () => {
        const id = 5;

        const updateHerobyIDSpy = jest.spyOn(superHeroService, 'deleteHero').mockResolvedValue({id});

        const result = await superHeroController.DeleteHeroById(id);

        expect(result).toStrictEqual({id});
        expect(updateHerobyIDSpy).toHaveBeenCalledWith(id);

    });

    it('delete hero should throw BadRequestException on invalid id', async () => {
        const invalidId = -1;
    
        try {
            await superHeroController.DeleteHeroById(invalidId);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
    });
});