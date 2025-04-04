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

    const { url, publicId } = await uploadToCloudinary(req.file.path)

    const fileUploaded = await Image.create({
      publicId,
      url
    })

    res.status(201).json({
      success: true,
      message: "File Uploaded Succesfully",
      imageId: publicId,
      imageURL: url

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
          message: "Image is fetched successfully from the Database" ,
          data : getImageThroughId
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

const getImagesByImagePublicId =  async(req, res) => {
  try {
    try {
       const getPublicId = req.params.id ;
       const getImageByImageThroughPublicId = await Image.find({publicId : getPublicId})
       if(getImageByImageThroughPublicId) {
        return res.status(200).json({
          success : true ,
          message : "Image is fetched successfully from the Database" ,
          data : getImageByImageThroughPublicId
        })
       }
       else {
        return res.status(404).json({
          success : false ,
          message : "Image Public ID provided is not Found. Try with a different ID "
        })
       }
    }
    catch(error){
      console.log(error)
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      success : false ,
      message: "Internal Server Error"
    })
  }
}

module.exports = { uploadToCloudinaryControl, getAllImagesFromDb , getImagesById  , getImagesByImagePublicId}