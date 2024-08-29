import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function Signout({btnName}: { btnName: string }) {
    const router = useRouter();
 const [render , setRender] = useState(false);
    useEffect(()=>{
        setRender(true);
    },[])
  
    function SignOut(){
        setRender(true);
        if(render){
            console.log(JSON.stringify(localStorage.getItem("userId")))

            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            console.log(JSON.stringify(localStorage.removeItem("userId")))
            router.replace('/sign-in')
        }
      
    }

  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{btnName}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between">
                <Button type="submit" variant="secondary" onClick={()=>{SignOut()}}>
                  Submit
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