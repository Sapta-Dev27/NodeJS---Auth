const mongoose = require("mongoose")

const connectToDb = async () => {
  try {
    try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log("Database is connected successfully")
    }
    catch (error) {
      console.log(error)
    }
  }
  catch {
    console.log("Database is not connected")
  }
}

module.exports = connectToDb;

