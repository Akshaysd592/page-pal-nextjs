import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books.model";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/type/ApiResponse";




export async function PUT(request: Request){
   await dbConnect();
   try {
      //  console.log("inside get all books")
      //    const {userId} = await request.json();
      //    console.log(userId,"got id -------------------")

        //  const findbooks = await UserModel.findOne({_id:userId})?.populate({path:"bookList",select:"title author genre bookfile"}).exec();
        const findbooks = await BookModel.find({});
    
          console.log(findbooks);
        // if(findbooks.length == 0){
        //     return ApiResponse(false,404,"Can not find any books")
        // }

        // return ApiResponse(true,200,"Books obtained successfully",findbooks)
        return Response.json({
           success:true,
           message:"Data fetched successfully",
          data:findbooks
        },{
          status:200
        })

       

    
   } catch (error:any) {
    console.log("Can not get all books details due to ", error);

    return ApiResponse(false,500,error.message)
   }

}