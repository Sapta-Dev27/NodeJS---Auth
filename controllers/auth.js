const user = require('../models/user');
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


    const accestoken = jwt.sign({ username: checkUser.userName, userid: checkUser._id, userRole: checkUser.userRole, userEmail: checkUser.userEmail }, "123rdfvjhwg78", {
      expiresIn: "15m"
    })


    res.status(200).json({
      success: true,
      message: " User Signed in Successfully",
      accestoken,
    })


  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: " Internal Error Occurred"
    })
  }

}

const userChangePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userid;
    const { userOldPassword, userNewPassword } = req.body;
    const userCheck = await user.findById(userId)
    if (!userCheck) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    const checkPassword = await bycryptjs.compare(userOldPassword, userCheck.userPassword)

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: " Old Password does not match with the entered passowrd"
      })
    }

    const salt = await bycryptjs.genSalt(10);
    const hashedNewPassword = await bycryptjs.hash(userNewPassword, salt)

    userCheck.userPassword = hashedNewPassword;
    await userCheck.save();

    return res.status(200).json({
      success: true,
      message: "Password is changed succesffully"
    })

  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal Server Error"
    })
  }
}

const userChangeEmail = async (req, res) => {
  try {
    const userId = req.userInfo.userid;
    const { userNewEmail } = req.body;

    const userCheck = await user.findById(userId);
    if (!userCheck) {
      return res.status(404).json({
        success: false,
        message: "User Does not exist"
      })
    }

    const userCheckEmail = await user.findOne({ userEmail: userNewEmail })
    if (userCheckEmail) {
      return res.status(401).json({
        success: false,
        message: "Entered Email already exits . Try with a different Email"
      })
    }

    userCheck.userEmail = userNewEmail;
    await userCheck.save();
    return res.status(200).json({
      success: true,
      message: "Email is changed successfully"
    })

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"

    })
  }
}

const userchangeUserName = async (req, res) => {
  try {
    const userId = req.userInfo.userid;
    const { newuserName } = req.body;

    const userCheck = await user.findById(userId);
    if (!userCheck) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    const checkUserName = await user.findOne({ userName: newuserName })
    if (checkUserName) {
      return res.status(401).json({
        success: false,
        message: "Username already exits. Try another username"
      })
    }

    userCheck.userName = newuserName;
    await userCheck.save();

    return res.status(200).json({
      success: true,
      message: "Username changed succesfully"
    })


  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const userForgetPassword = async (req, res) => {
  try {
    const { userInputEmail , userNewPassword} = req.body;
    const checkUser = await user.findOne({ userEmail: userInputEmail })
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "No user Exists with such Email. Try another email"
      })
    }
    
    const salt = await bycryptjs.genSalt(10);
    const hashedNewPassword = await bycryptjs.hash( userNewPassword , salt);
    checkUser.userPassword = hashedNewPassword;
    await checkUser.save();

    return res.status(200).json({
      success : true ,
      message : "Password is updated succesfully"
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

module.exports = { userRegister, userLogin, userChangePassword, userChangeEmail, userchangeUserName , userForgetPassword };