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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  successResponseWithData,
  successResponseForNewEntry,
} from 'src/helpers/apiResponse';
// import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
        return successResponseForNewEntry('User Created Sucessfully.', result[0]);
      } else {
        throw new ForbiddenException('Error while updating record!');
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('getUser/:id')
  async getUserByUserId(
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
      throw error;
    }
  }
}
