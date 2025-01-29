import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerData } from './logger.data';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService, LoggerData],
  exports: [LoggerService, LoggerData],
})
export class LoggerModule {}
