import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Models } from "src/enums/models";
import { apiFactory } from "src/utils/api.factory";
import { queryInterface } from "src/utils/api.features";
import { ProductDoc } from "./product.entity";
import { UserDoc } from "src/user/user.entity";


interface UpdateProduct {
    amount?:number;
    name?:string;
    cost?:number;
};

interface CreateProduct {
    amount:number;
    name:string;
    cost:number;
};



@Injectable()
export class ProductServices {
    constructor( @InjectModel(Models.Product) private model:Model<ProductDoc>,
    private factory:apiFactory<ProductDoc>){};
    async updateProduct(user:UserDoc,body:UpdateProduct,productId:ObjectId){
        await this.accessProduct(user,productId);
        const product=await this.model.findByIdAndUpdate(productId,body,{new:true});
        return { product };
    };
    async createProduct(user:UserDoc,body:CreateProduct){
        const product=await this.model.create({ ... body , seller:user._id });
        return { product };
    };
    getProduct(productId:ObjectId){
        return this.factory.
        getOne(this.model,productId)
    };
    getAllProducts(query:queryInterface){
        return this.factory.getAll(this.model,query);
    };
    async deleteProduct(user:UserDoc,productId:ObjectId){
        await this.accessProduct(user,productId);
        return this.factory.deleteOne(this.model,productId);
    };
    private async accessProduct(user:UserDoc,productId:ObjectId){
        const product=await this.model.findOne({_id:productId});
        if(!product){
            throw new HttpException("product not found",400);
        };
        if( product.seller.toString() !== user._id.toString() ){
            throw new HttpException('you can not access this product',400);
        };
    };
    async buyProduct(user:UserDoc,body:{ productId:ObjectId,amount:number }){
        const product=await this.model.findOne({_id:body.productId});
        if(body.amount > product.amount){
            throw new HttpException("you can not access this product",400);
        };
        const cost=product.cost * body.amount;
        if(user.deposit < cost ){
            throw new HttpException( "your deposit is not enough" , 400 )
        };
        product.amount -= body.amount;
        user.deposit -= cost;
        user.orders.push({product:body.productId,cost,amount:body.amount});
        await user.save();
        await product.save();
        return { ... body , deposit:user.deposit };
    }
};