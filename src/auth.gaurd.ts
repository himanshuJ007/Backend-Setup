import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return await this.validateRequest(request);
    }

    async validateRequest (request){
        const token = request.headers.authorization.split(' ')[1];
        try{
            const user = await this.jwtService.verifyAsync(token);
            if(user){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return false;
        }

    }
}

