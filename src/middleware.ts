
import { NextRequest,NextResponse } from "next/server"


import * as jwt from 'jsonwebtoken'




export async function middleware(request : NextRequest){
    let token = request.headers.get('x-auth-token');
  
     let user = token&& jwt.verify(token,process.env.JWT_SECRET!)
    
      
     const url = request.nextUrl

      if(user &&
        (   (url.pathname.startsWith('/sign-in'))||
            (url.pathname.startsWith('/sign-up'))
            // (url.pathname.startsWith('/'))
            // ||
            // (url.pathname.startsWith('/'))
        )
        ){
         return NextResponse.redirect(new URL('/dashboard',request.url))
      }


      if(!user  && url.pathname.startsWith('/dashboard')&& url.pathname.startsWith('/')){
        return NextResponse.redirect(new URL('/sign-in',request.url))
      }
  
      return NextResponse.next();

}

export const config = 
{
     matcher: [
    "/sign-in",
    "/sign-up",
    "/",
  
] 
}

