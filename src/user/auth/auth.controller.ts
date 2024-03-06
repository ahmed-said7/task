import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";

import { AuthServices } from "./auth.services";
import { queryInterface } from "src/utils/api.features";
import { User } from "src/decorator/current.user.decorator";
import { UserDoc } from "../user.entity";
import { UpdateUserDto } from "../dto/update.user.dto";
import { UpdateUserPassowrdDto } from "../dto/update.password";


@Controller("auth")
export class AuthController {
    constructor(private authService:AuthServices){};
    @Get()
    getAllUsers(@Query() query:queryInterface){
        return this.authService.getAllUsers(query);
    };
    @Get("logged-user")
    getLoggedUser(@User() user:UserDoc){
        return this.authService.getLoggedUser(user);
    };
    @Patch("deposit/:code")
    deposit(@User() user:UserDoc,@Param("code",ParseIntPipe) code:number){
        return this.authService.deposit(user,code);
    };
    @Patch("delete-me")
    deleteUser( @User() user:UserDoc ){
        return this.authService.deleteLoggedUser(user);
    };
    @Patch("update-me")
    updateUser( @User() user:UserDoc,@Body() body:UpdateUserDto ){
        return this.authService.updateLoggedUser(user,body);
    };
    @Patch("update-pass")
    updatePassword( @User() user:UserDoc,@Body() body:UpdateUserPassowrdDto ){
        return this.authService.updateLoggedUserPasswords(user,body);
    };
};