import dbConnect from "@/lib/dbConnect";
import ExchangeModel from "@/model/Exchange.model";
import { ApiResponse } from "@/type/ApiResponse";





export async function POST(request: Request){
    await dbConnect();
    try {
        const {senderuserId,receiverId,bookId,description} = await request.json();

        if(!senderuserId || !receiverId){
            return ApiResponse(false,400,"Something went wrong while sending exchange request..Try again later");
        }

        const newRequest = new ExchangeModel({
            sender:senderuserId,
            receiver:receiverId,
            bookrequested:bookId,
            description:description,
        })

        await newRequest.save();

        return ApiResponse(true,200,"Request send successfully",newRequest);
        
    } catch (error:any) {
        console.log("Error occured while sending request",error);
        return ApiResponse(false,500,error.message)
    }
}