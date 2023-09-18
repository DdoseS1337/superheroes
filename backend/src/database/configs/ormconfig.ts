import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SuperheroEntity } from '../models/superhero.model';

const config: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [SuperheroEntity],
    synchronize: true,
    logging: true,
};

export default config;
