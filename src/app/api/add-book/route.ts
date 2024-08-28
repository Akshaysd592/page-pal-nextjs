
import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books.model";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";

export async function GET(request:Request){
      await dbConnect();
      try {
         const {title} = await request.json();
         const checktitle = await BookModel.findOne({title});
         if(checktitle){
            return ApiResponse(false,400,"This book title already exists")
         }
        
      } catch (error) {
         console.log("Error occcured while checking title of book");
         return ApiResponse(false,404,"Title already exists")
      }
}

export async function POST(request:Request){
    await dbConnect();
    try {
        const{userId,title,author,genre,bookfile} = await request.json();
       
      // check title already checked
      if(!userId|| !title|| !author || !genre || !bookfile){
        return ApiResponse(false,400,"Please Enter all the required fields")
      }

       // make database entry
       const BookStored = await BookModel.create({
         title,
         author,
         genre,
         bookfile
       });

       // make entry in user also
       const userUpdate = await UserModel.findByIdAndUpdate({_id:userId},{
          $push:{
            bookList:BookStored.id
          }
       },{
        new:true
       })

        // all success then make response success
       return ApiResponse(true,200,"Book stored successfully",BookStored)

    } catch (error:any) {
        console.log("Error occured while adding book",error);
        return ApiResponse(false,500,error.message)
    }

}