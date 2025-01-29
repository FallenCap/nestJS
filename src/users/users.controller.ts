import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
  NotFoundException,
  ForbiddenException,
  Ip,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  successResponseWithData,
  successResponseForNewEntry,
} from 'src/helpers/apiResponse';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly loggerService: LoggerService,
      ) {}

  @Post('createUser')
  async createUser(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    user: CreateUserDto,
  ): Promise<any> {
    try {
      const result = await this.userService.createUser(user);

      if (result[0].userId) {
        return successResponseForNewEntry(
          'User Created Sucessfully.',
          result[0],
        );
      } else {
        throw new ForbiddenException('Error while updating record!');
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('getUser/:id')
  async getUserByUserId(
    @Ip() ip: string,
    @Req() req: Request,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ): Promise<any> {
    try {
        const result = await this.userService.getUserByUserId(userId);
        
        if (result && result.length > 0) {
            return successResponseWithData('User Found.', result[0]);
        } else {
            throw new NotFoundException('User not found!');
        }
    } catch (error) {
        this.loggerService.error(error.message, error.stack);
        this.loggerService.errorLogToDb(UsersController.name, req.originalUrl, JSON.stringify(req.params), error.message);
      throw error;
    }
  }
}
