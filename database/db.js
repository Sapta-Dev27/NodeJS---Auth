const mongoose = require("mongoose")

const connectToDb = async () => {
  try {
    try {
    await mongoose.connect("mongodb+srv://saptadev27:saptadev27@cluster0.lofv3yp.mongodb.net/")
    console.log("Database connected succesfully")
    }
    catch(error){
      console.log(error)
    }
  }
  catch {
    console.log("Database is not connected")
  }
}

module.exports = connectToDb ;

