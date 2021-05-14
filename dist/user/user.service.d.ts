import { User } from './interface/user.interface';
export declare class UserService {
    private readonly user;
    create(user: User): void;
    findAll(): User[];
}
