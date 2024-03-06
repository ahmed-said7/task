import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { queryInterface } from "src/utils/api.features";
import { User } from "src/decorator/current.user.decorator";
import { ProductServices } from "./product.services";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { ObjectId } from "mongoose";
import { UserDoc } from "src/user/user.entity";
import { BuyProductDto } from "./dto/buy.product.dto";



@Controller("product")
export class ProductController {
    constructor(private prodService:ProductServices){};
    @Get()
    getAllProds(@Query() query:queryInterface){
        return this.prodService.getAllProducts(query);
    };
    @Get(":id")
    getProduct(@Param("id") id:ObjectId){
        return this.prodService.getProduct(id);
    };
    @Post()
    createProd(@User() user:UserDoc , @Body() body:CreateProductDto ){
        return this.prodService.createProduct(user, body);
    };
    @Patch("buy/:id")
    buyProd( @User() user:UserDoc ,@Body() body:BuyProductDto ){
        return this.prodService.buyProduct(user, body);
    };
    @Patch(":id")
    updateProd( @User() user:UserDoc ,
    @Body() body:UpdateProductDto,@Param("id") id:ObjectId ){
        return this.prodService.updateProduct( user, body,id );
    };
    @Delete(":id")
    deleteProd( @User() user:UserDoc ,@Param("id") id:ObjectId ){
        return this.prodService.deleteProduct( user,id );
    };
    
};