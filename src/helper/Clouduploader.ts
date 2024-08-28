import  {cloudinaryconfig} from '@/lib/configCloudinary'
import { v2 as cloudinary } from 'cloudinary';
 

export async function Clouduploader(file:string){
    cloudinaryconfig();
     // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(file)
       .catch((error) => {
           console.log(error);
       });
}