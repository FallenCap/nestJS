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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
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
      console.log(result);
    } catch (error) {
      console.log('Error: ', error);
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
      
      if (result?.length === 0) {
        return new NotFoundException('User not found!');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
