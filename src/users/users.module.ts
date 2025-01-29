import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { UserData } from './user.data';
import { LoggerService } from 'src/logger/logger.service';
import { LoggerData } from 'src/logger/logger.data';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserData, LoggerService, LoggerData],
  exports: [UserData]
})
export class UsersModule {}