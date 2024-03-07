import mongoose, { ObjectId } from "mongoose";
import { Models } from "src/enums/models";

export const productSchema=new mongoose.Schema({
    seller:
    {
        type:mongoose.Types.ObjectId,
        ref:Models.User
    },
    amount:Number,
    name:String,
    cost:Number
});
productSchema.index({"name":"text"});
export interface ProductDoc extends mongoose.Document {
    seller:ObjectId,
    amount:number,
    name:string,
    cost:number
};

