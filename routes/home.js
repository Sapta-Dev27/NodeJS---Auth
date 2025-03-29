const express = require("express")
const router = express.Router() ;
const homemiddleware = require("../middleware/home")


router.get("/welcome" , homemiddleware , (req, res) => {
  const { username , userRole , userid} = req.userInfo ;
  res.json({
    "message": "Welcome to home page",
    user : {
      username ,
      userRole ,
      userid,
      userEmail
    }
  })
})


module.exports = router;