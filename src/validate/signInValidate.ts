import {z} from 'zod'

export const signInValidate = z.object({
    email:z.string().email().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email').trim(),
    password:z.string().min(3,"Password should be minimum 3 letters long").max(30,"Password can at max 30 letters long").trim()
})