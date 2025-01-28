import { HttpStatus } from "@nestjs/common";

export const successResponseWithData = (message: string, data: any): object => {
    return {
        statusCode: HttpStatus.OK,
        message,
        data
    }
}

export const successResponseForNewEntry = (message: string, data: any): object => {
    return {
        statusCode: HttpStatus.CREATED,
        message,
        data
    }
}