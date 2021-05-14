import { CreateUserDto } from "./userDto/creaateUserDto";
import { UpdateUserDto } from "./userDto/updateUserDto";
import { UserService } from "./user.service";
import { User } from './interface/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): User[];
    findOne(id: string): string;
    create(createCatDto: CreateUserDto): Promise<void>;
    update(id: string, updateCatDto: UpdateUserDto): string;
    remove(id: string): string;
}
