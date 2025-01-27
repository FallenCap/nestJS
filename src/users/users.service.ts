import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, QueryTypes } from 'sequelize';

@Injectable()
export class UsersService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createUser(req: any): Promise<any> {
        try {
            const {firstName, lastName, email, mobileNumber} = req.body;
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
