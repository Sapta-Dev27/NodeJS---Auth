const express = require("express")
const router = express.Router();
const subAdminMiddleware = require('../middleware/subadmin')
const authMiddleware = require("../middleware/home")

router.get("/subadminhome" , authMiddleware , subAdminMiddleware ,  (req,res) => {
  const {username , userRole , userid , userEmail } = req.userInfo ;
  res.json({
     
    "message" : "Welcome to the SubAdmin Page" ,
    user : {
      username ,
      userRole ,
      userid ,
      userEmail
    }
  })
})

module.exports = router ;

