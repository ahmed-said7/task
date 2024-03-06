import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { ObjectId } from "mongoose";


declare global {
    namespace Express {
        interface Request {
            user?:{
                _id:ObjectId;
                username:string;
                password:string;
                passwordChangedAt:Date;
                role:string;
                deposit:number;
            };
        }
    }
}


export const User=createParamDecorator
((val:unknown,ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest() as Request;
        return request.user;
})