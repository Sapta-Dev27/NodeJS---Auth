const mongoose = require("mongoose")

const connectToDb = async () => {
  try {
    try {
      await mongoose.connect("URL")
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

