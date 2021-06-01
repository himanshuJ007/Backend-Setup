import { CreateUserDto } from "./Dto/creaateUserDto";
import { UpdateUserDto } from "./Dto/updateUserDto";
import { UserService } from "./user.service";
import { User } from './interface/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(payload: CreateUserDto, file: any): Promise<User>;
    update(id: string, updateCatDto: UpdateUserDto): string;
    remove(id: string): string;
}
