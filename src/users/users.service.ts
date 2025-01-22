import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Subham",
            "email": "subham@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Garvit",
            "email": "garvit@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Rupam",
            "email": "rupam@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "Surya",
            "email": "surya@gmail.com",
            "role": "INTERN"
        },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role) {
           const rolesArray = this.users.filter(user => user.role === role);

           if(rolesArray.length === 0) {
                throw new NotFoundException("User role not found!");
           }
        }

        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException("User doesn't exists!")
        return user;
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);

        return newUser;
    }

    update(id: number, updateUser: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if(user.id === id) {
                return {...user, ...updateUser};
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id:number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }

}
