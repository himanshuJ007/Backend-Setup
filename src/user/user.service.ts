import { Injectable, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface'
import { CreateUserDto } from './Dto/creaateUserDto';
import * as bcrypt from 'bcryptjs';
import {AwsService} from "../aws/aws.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly awsService:AwsService,
    ){}


    async create(data: CreateUserDto, file): Promise<User> {
        let user = {...data};
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = await this.userModel.create({...user,
            isActive: true ,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()})

        try {
            user["profilePicture"] = await this.awsService.ProfilePictureUpload(file);
        } catch (error) {
            console.log(`Failed to upload image file: ${error.message}`);
        }
        return await this.findOne(newUser._id);
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(_id: string): Promise<User>{
        return await this.userModel.findOne({_id});
    }

    async findOneByEmail(email: string): Promise<User>{
        return await this.userModel.findOne({email});
    }

}
