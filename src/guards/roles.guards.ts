import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';


@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get("roles", context.getHandler());
        console.log(roles);
        if (!roles) {
            return false;
        }
        const request=context.switchToHttp().getRequest() as Request;
        console.log(request.user);
        return roles.includes(request.user.role);
    };
};