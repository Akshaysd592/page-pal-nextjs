import dbConnect from "@/lib/dbConnect";
import ExchangeModel from "@/model/Exchange.model";
import { ApiResponse } from "@/type/ApiResponse";

export async function PUT(request: Request){
    await dbConnect();
    try {
        const {userId} = await request.json();

        
          if(!userId){
               return ApiResponse(false,400,"something went wrong..");
          }


         const getrequestreceiveddata = await ExchangeModel.find({receiver:userId})
          if(getrequestreceiveddata.length === 0){
            return ApiResponse(true,200,"You don't have any request");
             
          }
        return ApiResponse(true,200,"Request data fetched successfully",getrequestreceiveddata);
        
    } catch (error:any) {
        console.log("Error occured while sending request",error);
        return ApiResponse(false,500,error.message)
    }
}