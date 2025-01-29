import { Injectable, Inject } from "@nestjs/common";
import { Sequelize, QueryTypes } from 'sequelize';

@Injectable()
export class LoggerData {
    
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async errorLogToDb(controllerName:string, routeName:string, inputParameter:string, errorMessage:string): Promise<any> {
        try {
            const procedureName = 'usp_generate_error_log'
            await this.sequelize.query(`CALL ${procedureName}(:controllerName, :routeName, :inputParameter, :errorMessage)`, {
                replacements: {controllerName, routeName, inputParameter, errorMessage},
                type: QueryTypes.RAW
            })
        } catch (error) {
            throw error;
        }
      }
}