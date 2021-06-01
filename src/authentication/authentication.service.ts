import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../user/interface/user.interface";

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
    ){}

    async validateUser(email:string, password:string):Promise<User>{
        const user = await this.userService.findOneByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                return user;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }
}
