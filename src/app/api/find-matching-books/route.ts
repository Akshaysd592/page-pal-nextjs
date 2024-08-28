import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books.model";
import { ApiResponse } from "@/type/ApiResponse";





export async function PUT(request: Request){
        await dbConnect();
        try {
            const {options} = await request.json();
            if(!options.length){
                return ApiResponse(false,400,"Please enter some data in options")
            }
            console.log(options)
            // get data
            let getmatcheddata = [];
            for(let data of options){
                let subdata = await BookModel.find({genre:data});
                console.log(data,subdata)
                if(subdata.length>0){
                    getmatcheddata.push(subdata);
                }
            }

            if(getmatcheddata.length === 0){
                return ApiResponse(true,200,"No books found for your interest, Try Other options")
            }

            return ApiResponse(true,200,"Found match for your interest",getmatcheddata);

           

            
        } catch (error:any) {
            console.log("Error occured while checking matched interest");
            return ApiResponse(false,500,error.message)
        }
}