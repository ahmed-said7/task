import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { apiModule } from "src/utils/api.module";
import { ProtectMiddleware } from "src/middleware/protect.middleware";
import { productSchema } from "src/product/product.entity";
import { userSchema } from "src/user/user.entity";
import { ProductController } from "./product.controller";
import { UserController } from "src/user/user/user.controller";
import { ProductServices } from "./product.services";



@Module({ 
    imports : [
        apiModule
        ,MongooseModule.forFeature([{
            name:Models.User,schema:userSchema
        },
        {
            name:Models.Product,schema:productSchema
        }
    ])
    ],
    controllers:[ProductController],
    providers:[ProductServices]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ProtectMiddleware).forRoutes(ProductController)
    };
};