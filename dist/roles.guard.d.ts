import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
export declare class RolesGuard implements CanActivate {
    private readonly refelector;
    constructor(refelector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean>;
    validateRoles(roles: any, request: any): Promise<boolean>;
}
