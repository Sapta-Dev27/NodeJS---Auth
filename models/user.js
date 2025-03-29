const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,

  },
  userRole : {
    type : String ,
    enum : ["user" , "admin" , "subadmin"] ,
    default : "user"
  }
})

module.exports = mongoose.model("UserSchema", userSchema)