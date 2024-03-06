import mongoose, { ObjectId, Query } from "mongoose";
import * as bcrypt from "bcryptjs";
import { Models } from "src/enums/models";
export const userSchema=new mongoose.Schema({
    role:
    {
        type:String,
        enum:["seller","buyer"]
        ,default:"buyer"
    },
    deposit:{type:Number,default:0},
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    passwordChangedAt:Date,
    orders:[{ 
        product:{
            type:mongoose.Types.ObjectId,
            ref:Models.Product
        }
        ,amount:Number,cost:Number  
    }]
},{toObject:{virtuals:true},toJSON:{virtuals:true}});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
    };
    return next();
});
userSchema.pre< Query< UserDoc | UserDoc[] , UserDoc > >(/^find/ig,function(){
    this.populate({ path:"orders.product",select:"name -_id" })
});
userSchema.index({username:"text"})
userSchema.virtual("products",{localField:"_id",foreignField:"seller",ref:Models.Product});

export interface UserDoc extends mongoose.Document {
    role:string;
    deposit:number;
    username:string;
    password:string;
    passwordChangedAt:Date;
    orders:{ 
        product:ObjectId
        ,amount:number,cost:number  
    }[]
}