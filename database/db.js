const mongoose = require("mongoose")

const connectToDb = async () => {
  try {
    try {
    await mongoose.connect("URL
                           ")
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

