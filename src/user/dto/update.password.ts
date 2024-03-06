import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserPassowrdDto {
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    passwordConfirm:string;
    @IsNotEmpty()
    @IsString()
    currentPassword:string;
};