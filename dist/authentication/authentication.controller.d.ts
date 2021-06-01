import { AuthenticationService } from "./authentication.service";
import { LoginDto } from "./Dto/login";
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from "./Dto/register";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
export declare class AuthenticationController {
    private authenticateService;
    private userService;
    private jwtService;
    private configService;
    constructor(authenticateService: AuthenticationService, userService: UserService, jwtService: JwtService, configService: ConfigService);
    login(payload: LoginDto): Promise<{
        access_token: string;
        message: string;
    } | {
        message: string;
        access_token?: undefined;
    }>;
    register(payload: RegisterDto, file: any): Promise<{
        message: string;
        user?: undefined;
    } | {
        user: {
            _id: string;
            name: string;
            age: number;
            email: string;
        };
        message: string;
    }>;
}
