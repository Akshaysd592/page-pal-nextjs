

export function ApiResponse(success:boolean,statuscode:number,message:string,data?:object){
    return Response.json(
     {  success:success,
        message:message,
        data: data || "",
    },{
      status:statuscode,
    }
  )
}