"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import  { useForm }  from "react-hook-form"
import {z} from 'zod'
import {signupValidate} from '@/validate/signupvalidate'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';




function SignUpPage() {

    const { toast } = useToast()
    const router = useRouter();
    
     const [submitting , setSubmitting] = useState(false);
   
      const form = useForm<z.infer<typeof signupValidate>>({ 
        resolver: zodResolver(signupValidate ),
        defaultValues:{
          name:'',
          email:'',
          password:''
        }
     })
    

async function onSubmit(values: z.infer<typeof signupValidate>){ 
     
          setSubmitting(true) // making submit button disbled

        //  make api call 
        try {
             const signupdata = await axios.post('/api/sign-up',values)
             toast({
                title:"Signup successfully",
                description: `Now you can signIn`,
              })
            
              router.replace('/sign-in')
            
        } catch (error:any) {
            console.log("Error occured while signup");
            toast({
                title:"Signup failed",
                description:error?.message
            })
            setSubmitting(false);
        } 
    

}

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-red-400 content-center  text-center'>
      <h2 className='sm:font-extrabold sm:text-5xl p-5 sm:pb-7 uppercase'>Sign In </h2>
    
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
  )
}


export default SignUpPage;