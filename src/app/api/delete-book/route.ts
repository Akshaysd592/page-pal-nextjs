import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books.model";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";





export async function DELETE(request: Request) {
    await dbConnect();
    try {

        const { userId, bookId } = await request.json();

        // validation
        if (!userId || !bookId) {
            return ApiResponse(false, 400, "Something went wrong while deletiong book");
        }

        // pull bookid from userbooklist
        const removeBookFromUser = await UserModel.findByIdAndUpdate({_id:userId},{
            $pull:{bookList:{bookId}}
        },{
            new:true
        });



        // Delete the book
        const deleteBook = await BookModel.findByIdAndDelete({_id:bookId});

        if(deleteBook){
            return ApiResponse(true,200,"Book deleted Successfully");
        }

        



    } catch (error: any) {
        console.log("Error occured while deleting book", error.message);
        return ApiResponse(false, 500, error.message)
    }

}