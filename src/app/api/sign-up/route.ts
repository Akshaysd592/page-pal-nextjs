import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";
import bcrypt from 'bcryptjs'



export async function POST(request:Request){
   
        await dbConnect();
        try {

            const {name,email, password} = await request.json();

            // find email exist or not 
            const userExist = await UserModel.findOne({email})
            console.log(userExist,'-------------------');

            if(userExist){ // if user already exist 
                return ApiResponse(200,"User already Exists");
            }

            // hashed password
            const hashedPassword = await bcrypt.hash(password,10); // hashed password with 10 rounds of encryption

            // save data in database
            const userSaved = await UserModel.create({
                name,
                email,
                password:hashedPassword,
                bookList:[],
                exchangeRequest :[],
            })
            console.log("User stored successfully...")
            return ApiResponse(200,"SignUp successfull..")



        } catch (error:any) {
            console.log("Error in Signup api");
            return ApiResponse(
                200,
                error.message
            )
        }
}