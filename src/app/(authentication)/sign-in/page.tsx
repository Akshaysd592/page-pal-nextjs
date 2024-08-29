"use client";

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import  { useForm }  from "react-hook-form"
import {z} from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signInValidate } from '@/validate/signInValidate';




function SignInPage() {

    const { toast } = useToast()
    const router = useRouter();
    
     const [submitting , setSubmitting] = useState(false);
     const [localvalue, setLocalValue] = useState(false);
     const [render,setRender] = useState(false);
   
      const form = useForm<z.infer<typeof signInValidate>>({ 
        resolver: zodResolver(signInValidate ),
        defaultValues:{
          email:'',
          password:''
        }
     })
 
    


     function setData(signIndata:any){
      localStorage.setItem('email',(signIndata.data?.data?.email)); 
      localStorage.setItem('userId',(signIndata.data?.data._id));

    }

    useEffect(()=>{
           setRender(true)
    })
    

async function onSubmit(values: z.infer<typeof signInValidate>){ 
     
          setSubmitting(true) // making submit button disbled

        //  make api call 
        try {
             const signIndata = await axios.post('/api/sign-in',values)
            //  console.log(signIndata);
             setLocalValue(true);
            if(localvalue && render){ // if window rendered and apivalue returned then store it to localstorage
              setData(signIndata);
            }

             toast({
                title:"SignIn successfully",
                description: `Welcome to home page`,

              })
            
              router.replace('/')
            
        } catch (error:any) {
            console.log("Error occured while signIn");
            toast({
                title:"SignIn failed",
                description:error?.message
            })
            setSubmitting(false);
        }

}

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center  content-center  text-center'>
      <h2 className='sm:font-extrabold sm:text-5xl p-5 sm:pb-7 uppercase'>Sign In </h2>
      <div className='w-1/4'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter your Password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={submitting} type="submit">Submit</Button>
      </form>
    </Form>
       </div>
    </div>
  )
}


export default SignInPage;