import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export async function POST(request:Request){
  // database connection 
  await dbConnect();

  try {

    const {email,password} = await request.json();
    // console.log("here we are 1",email,password)
    
    // check if user not exist, if not exist then message for sign-up
    const userExist = await UserModel.findOne({email});
    if(!userExist){
        return ApiResponse(true,404,"You are not registered yet,Please Signup first..")
    }

    // if user already exist then compare password
    const passwordmatch = await bcrypt.compare(password,userExist.password);

    if(!passwordmatch){
      return ApiResponse(false,400,"password not matched")
    }
     

    let payload = {
      user:{
        userId : userExist._id,
        email: userExist.email
      }
    }
    
     await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });
    
    


     return ApiResponse(true,200,"User sign-in successfully...",userExist)
    


  } catch (error:any) {
     console.log("Error occured while sign-in",error)
    return  ApiResponse(false,500,`Error occured while sign-in ${error.message}`)
    
  }



}