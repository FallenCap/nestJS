import { Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('createUser')
    async createUser(@Req() req: Request): Promise<any> {
        try {
            const result = await this.userService.createUser(req);
            console.log(result);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    @Get('getUser/:id')
    async getUserByUserId(@Param('id', ParseIntPipe) userId: number): Promise<any> {
        try {
            const result = await this.userService.getUserByUserId(userId);
            console.log(result);
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}
