import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/database/configs/ormconfig';
import { SuperHeroModule } from './shero.module';

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
