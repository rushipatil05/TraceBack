import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

<<<<<<< HEAD
export default cloudinary;
=======
export default cloudinary;
>>>>>>> fbfea3cef4b165d0857265ed01785e7fb6a6d97d
