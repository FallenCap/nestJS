import { Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserData } from './user.data';

@Injectable()
export class UsersService {
    constructor(private readonly userData: UserData) {}

    async createUser(user: CreateUserDto): Promise<any> {
        try {
            const result = await this.userData.createUser(user);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUserId(userId: number): Promise<any> {
        try {
            const result = await this.userData.getUserByUserId(userId);

            return result;
        } catch (error) {
            throw error;
        }
    }
}
