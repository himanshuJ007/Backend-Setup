import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refelector: Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> {
    const roles = this.refelector.get<string>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    return this.validateRoles(roles,request);
  }
  async validateRoles(roles,request): Promise<boolean>{
    if(roles.includes(request.headers.roles)){
      return true;
    }
    return false;
  }
}
