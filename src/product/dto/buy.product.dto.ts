import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class BuyProductDto {
    @IsNotEmpty()
    @IsNumber()
    amount:number;
    @IsNotEmpty()
    @IsMongoId()
    productId:ObjectId;
};