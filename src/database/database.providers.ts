import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { modelArr } from '../models/models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.getOrThrow('DB_DIALECT'),
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_SCHEMA'),
      });
      sequelize.addModels(modelArr);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
