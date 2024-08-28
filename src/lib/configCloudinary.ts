 
import { v2 as cloudinary } from 'cloudinary';
 
 // Configuration
export const cloudinaryconfig = ()=>{
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
})
};
