import mongoose, { Schema } from 'mongoose';

import { Exchangetype } from './Exchange.model';

export interface User extends mongoose.Document{
    name:string;
    email:string;
    password:string;
    bookList:[];
    exchangeRequest:[];
}


 const UserSchema : Schema<User> = new mongoose.Schema({
    name:{
          type:String,
          required:[true,'Name is required'],
          trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email'],
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    bookList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Books'
        }
    ],
    exchangeRequest:[
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Exchange'
         }
    ]
    
})


const UserModel = (mongoose.models.User as mongoose.Model<User>)
                    || mongoose.model<User>("User",UserSchema)


export default UserModel;