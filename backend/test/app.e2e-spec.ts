import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { SuperheroEntity } from '../src/database/models/superhero.model';
describe('SuperHeroController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let createdSuperhero: SuperheroEntity;

  it('/ (Post) Create Hero', async () => {
    const superheroData = {
      "nickname": "test",
      "real_name": "sdsd dsd",
      "origin_description": "love big pussy",
      "superpowers": ["test"],
      "catch_phrase": "letsgobaby",
      "heroimages": ["test"]
    };

    const response = await request(app.getHttpServer())
      .post('/superheroes/')
      .send(superheroData)
      .expect(201);
    createdSuperhero = response.body;

  });


  it('/:id (GET) Get hero by id', () => {
    return request(app.getHttpServer())
      .get('/superheroes/' + createdSuperhero.id)
      .expect(200)
      .expect(createdSuperhero);
  });

  it('/ (GET) Get all hero and with new hero', () => {
    return request(app.getHttpServer())
      .get('/superheroes/')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        const superheroExists = response.body.some(hero => hero.id === createdSuperhero.id);
        expect(superheroExists).toBe(true);
      });
  });

  it('/:id (Put) Update new hero', async () => {
    const superheroId = createdSuperhero.id
    const superheroUpdateData = {
      "nickname": "test",
      "real_name": "sdsd dsd",
      "origin_description": "love big pussy",
      "superpowers": ["test"],
      "catch_phrase": "letsgobaby",
      "heroimages": ["test"]
    };

    return request(app.getHttpServer())
      .put('/superheroes/' + superheroId)
      .send(superheroUpdateData)
      .expect(200);

  });

  it('/:id (Delete) Delete new Hero', async () => {
    const superheroId = createdSuperhero.id

    return request(app.getHttpServer())
      .delete('/superheroes/' + superheroId)
      .expect(200);
  });

  it('/:id (Get) should return 404', async () => {
    const superheroId = createdSuperhero.id

    return request(app.getHttpServer())
      .get('/superheroes/' + superheroId)
      .expect(404)
      .expect((response) => {
        const body = response.body;
        expect(body.message).toBe(`Superhero with ID ${superheroId} not found`);
      });
  });

  it('/:id (Put) should return 404', async () => {
    const superheroId = createdSuperhero.id
    const superheroUpdateData = {
      "nickname": "test",
      "real_name": "sdsd dsd",
      "origin_description": "love big pussy",
      "superpowers": ["test"],
      "catch_phrase": "letsgobaby",
      "heroimages": ["test"]
    };

    return request(app.getHttpServer())
      .put('/superheroes/' + superheroId)
      .send(superheroUpdateData)
      .expect(404)
      .expect((response) => {
        const body = response.body;
        expect(body.message).toBe(`Superhero with ID ${superheroId} not found`);
      });

  });

  it('/:id (Delete) should return 404', async () => {
    const superheroId = createdSuperhero.id

    return request(app.getHttpServer())
      .delete('/superheroes/' + superheroId)
      .expect(404)
      .expect((response) => {
        const body = response.body;
        expect(body.message).toBe(`Superhero with ID ${superheroId} not found`);
      });
  });
});
