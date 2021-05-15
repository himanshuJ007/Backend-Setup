import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from './userDto/creaateUserDto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(user: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(_id: string): Promise<User>;
}
