import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { UserDoc } from "../user.entity";
import { apiFactory } from "src/utils/api.factory";
import { queryInterface } from "src/utils/api.features";
import * as bcrypt from "bcryptjs";


interface UpdateLoggedUser {
    username?: string;
    role?: string;
    deposit?: number;
};

interface updateLoggedUserPassword {
    password: string;
    passwordConfirm: string;
    currentPassword: string;
};

@Injectable()
export class AuthServices {
    constructor( @InjectModel(Models.User) private model:Model<UserDoc>,
    private factory:apiFactory<UserDoc>){};
    async updateLoggedUser(user:UserDoc,body:UpdateLoggedUser){
        await user.updateOne({ $set : body });
        await user.save();
        user.password=undefined;
        return { user };
    };
    async deleteLoggedUser(user:UserDoc){
        await user.deleteOne();
        return { user };
    };
    getLoggedUser(user:UserDoc){
        return this.factory.
        getOne(this.model,user._id,{ path:"products",select:"name cost -_id" })
    };
    getAllUsers(query:queryInterface){
        return this.factory.getAll(this.model,query);
    };
    async updateLoggedUserPasswords(user:UserDoc,body:updateLoggedUserPassword){
        const match=await bcrypt.compare(body.currentPassword,user.password);
        if(!match){
            throw new HttpException('password mismatch',400);
        };
        if(body.password !== body.passwordConfirm){
            throw new HttpException("password conflict",400);
        };
        user.password = body.password;
        user.passwordChangedAt=new Date(Date.now());
        await user.save();
        user.password=undefined;
        return { user };
    };
    async deposit(user:UserDoc,deposit:number){
        if(deposit % 5 != 0){
            throw new HttpException
            ('deposit dhould be of category 10,20,5,50,100',400)
        };
        user.deposit=deposit;
        await user.save();
        user.password=undefined;
        return { user };
    };
};