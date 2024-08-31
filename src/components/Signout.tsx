import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Signout({btnName}: { btnName: string }) {
    const router = useRouter();
    const [render , setRender] = useState(false);
    useEffect(()=>{
        setRender(true);
    },[])
  
    function SignOut(){
        
        if(render && (localStorage.getItem("userId") !== null)){
            
          // console.log(JSON.stringify(localStorage.getItem("userId")))
          
          delete axios.defaults.headers.common['x-auth-token'];
              localStorage.removeItem('userId');
              localStorage.removeItem('email');
            // console.log(JSON.stringify(localStorage.getItem("userId")))
            router.replace('/sign-in')
        }
      
    }

  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button className='p-6 m-4' variant="outline">{btnName}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sign Out</DialogTitle>
              <DialogDescription>
             Do you really want to Sign Out
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between">
                <Button type="submit" variant="secondary" onClick={()=>{SignOut()}}>
                  Yes
                </Button>
                <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
           

          </DialogContent>
        </Dialog>
  )
}

export default Signout