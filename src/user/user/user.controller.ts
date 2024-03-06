import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.services";
import { CreateUserDto } from "../dto/create.user.dto";
import { LoginUserDto } from "../dto/login.user.dto";


@Controller("user")
export class UserController {
    constructor(private UserService:UserService){};
    @Post('signup')
    signup(@Body() body:CreateUserDto ){
        return this.UserService.signup(body);
    };
    @Post('login')
    login(@Body() body:LoginUserDto){
        return this.UserService.login(body);
    };
};