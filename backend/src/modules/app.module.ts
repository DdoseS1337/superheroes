import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../database/configs/ormconfig';
import { SuperHeroModule } from './superhero.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => config,
    }),
    SuperHeroModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
