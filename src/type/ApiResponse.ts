

export function ApiResponse(success:boolean,statuscode:number,message:string,data?:object){
    return Response.json(
     {  success:success,
        data: data || "",
        message:message,
    },{
      status:statuscode,
    }
  )
}