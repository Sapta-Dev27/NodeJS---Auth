const user = require('../models/user');
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config();

const userRegister = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userRole } = req.body;
    const isExistingUser = await user.findOne({ $or: [{ userName }, { userEmail }] })
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists . Try with a different username or Email"
      })
    }
    const salt = await bycryptjs.genSalt(10);
    const userhashedPassword = await bycryptjs.hash(userPassword, salt);

    const newUser = await user.create({
      userName,
      userEmail,
      userPassword: userhashedPassword,
      userRole: userRole || "user",
    })

    if (newUser) {
      res.status(201).json({
        success: true,
        message: " User Registered successfully"
      })
    }
    else {
      res.status(404).json({
        success: false,
        message: "Failed to register user"
      })
    }
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: " Internal Server Error"
    })
  }
}

const userLogin = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const checkUser = await user.findOne({ userName });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: " User Doesnot exist"
      })
    }

    const passwordCheck = await bycryptjs.compare(userPassword, checkUser.userPassword);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      })
    }
   

    const accestoken = jwt.sign({ username: checkUser.userName, userid: checkUser._id  , userRole : checkUser.userRole , userEmail : checkUser.userEmail}, "123rdfvjhwg78" , {
      expiresIn: "15m"
    })
    

    res.status(200).json({
      success: true,
      message: " User Signed in Successfully",
      accestoken,
    })


  }
  catch(error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: " Internal Error Occurred"
    })
  }

}

module.exports = { userRegister, userLogin };