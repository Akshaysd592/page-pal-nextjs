import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books.model";
import { ApiResponse } from "@/type/ApiResponse";





export async function PUT(request:Request){
    await dbConnect();
    try {
         
       const {bookId,title,author,genre,bookfile} = await request.json();


       if(!bookId|| !title || !author || !genre || !bookfile){
        return ApiResponse(false,500,"Something went wrong while updating book, Please try again later...");
       }

       const updateBook = await BookModel.findByIdAndUpdate({_id:bookId},
        {
            title,
            author,
            genre,
            bookfile
        },
        {
            new:true
        }
       )

       return ApiResponse(true,200,"Book updated successfully");
        

    } catch (error:any) {
        console.log("Error occured while updating book ",error.message);
        return ApiResponse(false,500,error.message)
    }
}