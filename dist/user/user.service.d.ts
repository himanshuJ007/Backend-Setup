import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from './Dto/creaateUserDto';
import { AwsService } from "../aws/aws.service";
export declare class UserService {
    private readonly userModel;
    private readonly awsService;
    constructor(userModel: Model<User>, awsService: AwsService);
    create(data: CreateUserDto, file: any): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(_id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
