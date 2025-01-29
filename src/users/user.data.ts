import { Inject, Injectable} from "@nestjs/common";
import { Sequelize, QueryTypes } from 'sequelize';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserData {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createUser(user: CreateUserDto): Promise<any> {
        try {
            const {firstName, lastName, email, mobileNumber} = user;
            const procedureName: string = 'usp_update_user';
            const result  = await this.sequelize.query(`CALL ${procedureName}(:firstName, :lastName, :email, :mobileNumber)`, {
                replacements: {
                    firstName,
                    lastName,
                    email,
                    mobileNumber
                },
                type: QueryTypes.RAW
            });
            
            return result;
        } catch (error) {
            throw error;
        }
    }  
    
    async getUserByUserId(userId: number): Promise<any> {
        try {
            const procedureName = 'usp_get_user_by_userId'

            const result = await this.sequelize.query(`CALL ${procedureName}(:userId)`, {
                replacements: {userId},
                type: QueryTypes.RAW
            });
            
            return result
        } catch (error) {
            throw error;
        }
    } 
}
