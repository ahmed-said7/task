import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { apiModule } from "src/utils/api.module";
import { userSchema } from "./user.entity";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";
import { AuthServices } from "./auth/auth.services";
import { UserService } from "./user/user.services";
import { ProtectMiddleware } from "src/middleware/protect.middleware";
import { productSchema } from "src/product/product.entity";




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
    controllers:[UserController,AuthController],
    providers:[AuthServices,UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ProtectMiddleware).forRoutes("auth/*")
    };
};