import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
const path= process.env.environment && process.env.environment == "development" ? ".env":"docker.env"; 
@Module({
  imports:[
    ConfigModule.forRoot({isGlobal:true,envFilePath:"src/path"}),
    MongooseModule.forRootAsync({ 
      imports:[ConfigModule]
      ,useFactory:function(config:ConfigService){
        return {uri:config.get<string>('url')}
      }
      ,inject:[ConfigService]
    }),UserModule,ProductModule
  ]
})

export class AppModule {};
