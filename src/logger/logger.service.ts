import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { LoggerData } from './logger.data';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(private readonly loggerData: LoggerData) {
    super();
  }
  async logToFile(entry: any) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'logFile.log'),
        formattedEntry,
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async errorLogToDb(
    controllerName: string,
    routeName: string,
    inputParameter: string,
    errorMessage: string,
  ): Promise<any> {
    try {
      await this.loggerData.errorLogToDb(
        controllerName,
        routeName,
        inputParameter,
        errorMessage,
      );
    } catch (error) {
      throw error;
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
