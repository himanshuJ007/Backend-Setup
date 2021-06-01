import {Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthenticationService} from "./authentication.service";
import { LoginDto } from "./Dto/login";
import { JwtService } from '@nestjs/jwt';
import {RegisterDto} from "./Dto/register";
import {UserService} from "../user/user.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ConfigService} from "@nestjs/config";
import * as dotenv from 'dotenv';

dotenv.config({path:'.development.env'});

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private authenticateService: AuthenticationService,
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    @Get('login')
    async login(@Body() payload:LoginDto) {
        // validate User
        console.log(process.env.JWT_SECRET);
        const user = await this.authenticateService.validateUser(payload.email, payload. password);
        // Generate Jwt Token If User Exist
        if(user){
            return {
                access_token: this.jwtService.sign({ username: payload.email, sub: user._id }),
                message: 'SuccessFully LoggedIn . . .'
            };
        }else{
            return {
                message: 'LOGIN Failed . . .'
            };
        }
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('file'))
    async register(@Body() payload: RegisterDto,@UploadedFile() file){
        //Is user Exist
        const oldUser = await this.userService.findOneByEmail(payload.email);
        if(oldUser){
            return{
                message: ' User Already Exists with this email'
            }
        }else{
            const newUser = await this.userService.create(payload,file);
            const { password , ...user} = newUser;
            return{
                user: user,
                message: 'User Successfully Registered'
            }
        }
    }
}
