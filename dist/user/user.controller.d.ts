import { CreateUserDto } from "./userDto/creaateUserDto";
import { UpdateUserDto } from "./userDto/updateUserDto";
import { UserService } from "./user.service";
import { User } from './interface/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createCatDto: CreateUserDto): Promise<User>;
    update(id: string, updateCatDto: UpdateUserDto): string;
    remove(id: string): string;
}
