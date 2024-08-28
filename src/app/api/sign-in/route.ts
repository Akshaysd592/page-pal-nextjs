import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";
import bcrypt from 'bcryptjs'

export async function POST(request:Request){
  // database connection 
  await dbConnect();

  try {

    const {email,password} = await request.json();

    // check if user not exist, if not exist then message for sign-up
    const userExist = await UserModel.findOne({email});
    if(!userExist){
        return ApiResponse(true,404,"You are not registered yet,Please Signup first..")
    }

    // if user already exist then compare password
    const passwordmatch = await bcrypt.compare(password,userExist.password);

    if(passwordmatch) return ApiResponse(true,200,"User sign-in successfully...")
    


  } catch (error:any) {
     console.log("Error occured while sign-in")
    return  ApiResponse(false,500,`Error occured while sign-in ${error.message}`)
    
  }



}