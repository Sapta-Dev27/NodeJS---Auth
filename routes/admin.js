const express = require("express");
const adminMiddleware = require("../middleware/admin")
const authMiddleware = require("../middleware/home");
const router = express.Router() ;

router.get('/adminHome' , authMiddleware , adminMiddleware , (req , res) => {
  res.json( {
    "message" : "Welcome To the Admin Page"
  })
});



module.exports = router;