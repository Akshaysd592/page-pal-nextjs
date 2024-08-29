import {z} from 'zod'

export const signupValidate = z.object({
    name: z.string().min(1,{message:"Please enter minimum 1 characters"}).max(50,{message:"Please enter maximum of 50 characters"}).trim(),
    email:z.string().email().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email').trim(),
    password:z.string().min(3,"Password should be minimum 3 letters long").max(30,"Password can at max 30 letters long").trim()
})