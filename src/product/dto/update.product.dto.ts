import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDto {
    @IsOptional()
    @IsNumber()
    amount:number;
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsNumber()
    cost:number;
};