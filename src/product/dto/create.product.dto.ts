import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    amount:number;
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsNumber()
    cost:number;
};