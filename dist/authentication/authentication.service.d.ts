import { UserService } from "../user/user.service";
import { User } from "../user/interface/user.interface";
export declare class AuthenticationService {
    private userService;
    constructor(userService: UserService);
    validateUser(email: string, password: string): Promise<User>;
}
