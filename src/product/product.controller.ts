import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { queryInterface } from "src/utils/api.features";
import { User } from "src/decorator/current.user.decorator";
import { ProductServices } from "./product.services";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
import { ObjectId } from "mongoose";
import { UserDoc } from "src/user/user.entity";
import { BuyProductDto } from "./dto/buy.product.dto";
import { AuthorizationGuard } from "src/guards/roles.guards";
import { Roles } from "src/decorator/metadata.decorator";



@Controller("product")
@UseGuards(AuthorizationGuard)
export class ProductController {
    constructor(private prodService:ProductServices){};
    @Get()
    @Roles("buyer","seller")
    getAllProds(@Query() query:queryInterface){
        return this.prodService.getAllProducts(query);
    };
    @Get(":id")
    @Roles("buyer","seller")
    getProduct(@Param("id") id:ObjectId){
        return this.prodService.getProduct(id);
    };
    @Post()
    @Roles("seller")
    createProd(@User() user:UserDoc , @Body() body:CreateProductDto ){
        return this.prodService.createProduct(user, body);
    };
    @Patch("buy/:id")
    @Roles("buyer")
    buyProd( @User() user:UserDoc ,@Body() body:BuyProductDto ){
        return this.prodService.buyProduct(user, body);
    };
    @Patch(":id")
    @Roles("seller")
    updateProd( @User() user:UserDoc ,
    @Body() body:UpdateProductDto,@Param("id") id:ObjectId ){
        return this.prodService.updateProduct( user, body,id );
    };
    @Delete(":id")
    @Roles("seller")
    deleteProd( @User() user:UserDoc ,@Param("id") id:ObjectId ){
        return this.prodService.deleteProduct( user,id );
    };
    
};