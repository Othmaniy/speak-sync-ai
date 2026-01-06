// configure cloudinary service
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
console.log(process.env.CLOUD_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadtoCloudinary=async(filepath,resourceType ='video')=>{
    return await cloudinary.uploader.upload(filepath, { resource_type: resourceType });
}