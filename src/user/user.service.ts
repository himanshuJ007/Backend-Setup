import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface'
import { CreateUserDto } from './userDto/creaateUserDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    async create(user: CreateUserDto): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = await this.userModel.create({...user,
            isActive: true ,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()})
        return await this.findOne(newUser._id);
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(_id: string): Promise<User>{
        return await this.userModel.findOne({_id});
    }
}
