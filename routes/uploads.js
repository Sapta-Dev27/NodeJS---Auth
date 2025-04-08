const express = require("express")
const router = express.Router();

const authMiddleware = require("../middleware/home")
const adminMiddleware = require("../middleware/admin")
const {uploadToCloudinaryControl , getAllImagesFromDb ,  getImagesById , getImagesByImagePublicId ,deleletImages} = require("../controllers/uploads")
const middlewareImage = require("../middleware/uploads")


router.post("/uploadsImages" , authMiddleware , adminMiddleware , middlewareImage.single("images")  ,  uploadToCloudinaryControl )

router.get("/getAllImages" , authMiddleware , adminMiddleware ,getAllImagesFromDb) 

router.get("/getImagesById/:id" , authMiddleware , adminMiddleware , getImagesById)

router.get("/getImagesByPublicId/:id" , authMiddleware , adminMiddleware , getImagesByImagePublicId)

router.delete("/deleteImages/:id" , authMiddleware ,adminMiddleware , deleletImages)

module.exports = router