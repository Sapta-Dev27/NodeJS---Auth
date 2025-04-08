const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true
  },
   url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

module.exports = mongoose.model("Image" , ImageSchema)