import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { UserDoc } from "../user.entity";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";

interface UserLogin {
    username: string;
    password: string;
};

interface UserSignup {
    username: string;
    password: string;
    passwordConfirm:string;
    role?:string;
};

@Injectable()
export class UserService {
    constructor( @InjectModel(Models.User) private model:Model<UserDoc>,
    private config:ConfigService){};
    async signup(body:UserSignup){
        let user=await this.model.findOne({username:body.username});
        if(user){
            throw new HttpException('User already exists',400);
        };
        user=await this.model.create(body);
        const token=this.createToken(user);
        return { token };
    };
    async login(body:UserLogin){
        let user=await this.model.findOne({username:body.username});
        if(!user){
            throw new HttpException('User not exist',400);
        };
        const match=await bcrypt.compare(body.password,user.password);
        if( !match ){
            throw new HttpException('Password mismatch',400);
        };
        const token=this.createToken(user);
        return { token };
    };
    private createToken(user:UserDoc){
        const token=jwt.sign
        (
            { userId : user._id } ,
            this.config.get<string>("jwt_secret")
            ,{expiresIn:"30d"}
        )
        return token;
    };
};