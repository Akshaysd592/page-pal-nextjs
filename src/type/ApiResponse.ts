

export function ApiResponse(statuscode:number,message:string,data?:object){
    return Response.json(
     { success:true,
        status:statuscode,
        message:message,
        data: data || "",
    }
  )
}