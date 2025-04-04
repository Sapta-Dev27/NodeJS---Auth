const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = async (filepath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);
    return {
      url:uploadResult.secure_url,
      publicId: uploadResult.public_id
    };
  }
  catch (error) {
    console.log(error)
  }
}


module.exports = uploadToCloudinary;