const cloudinary = require("../config/cloudinary")
const fs = require("fs")
const path = require("path")
const uploadToCloudinary = require("../helpers/cloudinary-helper")
const Image = require("../models/image")
const params = require("../routes/uploads")


const uploadToCloudinaryControl = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No File is Uploaded"
      })
    }

    const { url, publicId, uploadedBy } = await uploadToCloudinary(req.file.path)

    const fileUploaded = await Image.create({
      publicId,
      url,
      uploadedBy: req.userInfo.userid,
    })

    res.status(201).json({
      success: true,
      message: "File Uploaded Succesfully",
      image: fileUploaded

    })

  }

  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internals Server Error"
    })
  }
}


const getAllImagesFromDb = async (req, res) => {
  try {
    try {
      const getImages = await Image.find({})
      if (getImages?.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Images Fetched from the Database Successfully",
          data: getImages
        })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: " No Image Found In Database . Add One First"
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Internal Server Error "
    })
  }
}


const getImagesById = async (req, res) => {
  try {
    try {
      const getId = req.params.id;
      const getImageThroughId = await Image.findById(getId);
      if (getImageThroughId) {
        return res.status(200).json({
          success: true,
          message: "Image is fetched successfully from the Database",
          data: getImageThroughId
        })
      }
      else {
        return res.status(404).json({
          success: false,
          message: " Image of the Given Id is not uploaded . Try with a different if or upload it first"
        })


      }
    }
    catch (error) {
      console.log(error)

    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Internal Server Error "
    })
  }
}

const getImagesByImagePublicId = async (req, res) => {
  try {
    try {
      const getPublicId = req.params.id;
      const getImageByImageThroughPublicId = await Image.find({ publicId: getPublicId })
      if (getImageByImageThroughPublicId) {
        return res.status(200).json({
          success: true,
          message: "Image is fetched successfully from the Database",
          data: getImageByImageThroughPublicId
        })
      }
      else {
        return res.status(404).json({
          success: false,
          message: "Image Public ID provided is not Found. Try with a different ID "
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


const deleletImages = async (req, res) => {
  try {
    const imageId = req.params.id;
    const checkImage = await Image.findById(imageId)

    if (!checkImage) {
      return res.status(404).json({
        success: false,
        message: "Image ID provided is not found. Try with a different ID "
      })
    }
    
    const userId = req.userInfo.userid;
    if( checkImage.uploadedBy.toString() !== userId){
      return res.status(400).json({
        success : false,
        message : "User cannot delete this image as user does not have the access to delete this image"
      })
    }
    
     const deleteImageFromCloudinary = await cloudinary.uploader.destroy(checkImage.publicId)
  
    const deleteImageFromDB = await Image.findByIdAndDelete(imageId)
    if(deleteImageFromDB && deleteImageFromCloudinary ){
      return res.status(200).json({
        success : true,
        message : "Image is successfully deleted from Database and Cloudinary Storage"
      })
    }

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


module.exports = { uploadToCloudinaryControl, getAllImagesFromDb, getImagesById, getImagesByImagePublicId , deleletImages }