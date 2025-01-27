import {PartialType} from '@nestjs/mapped-types';
import { IsString, IsInt, IsEmail, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Matches(/^\S.*\S$/, { message: 'firstName should not be empty or contain only spaces' })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    mobileNumber: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {};