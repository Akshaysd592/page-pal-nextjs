import dbConnect from "@/lib/dbConnect";



export async function POST(request:Request){
    console.log("inside signup")
        await dbConnect();
        try {
            console.log("db connected")
            return Response.json({
                status:200,
                message:"All working good"
            })
        } catch (error:any) {
            console.log("Error in Signup api");
            return Response.json({
                success:false,
                message:error.message,
            },{
                status:404
            })
        }
}