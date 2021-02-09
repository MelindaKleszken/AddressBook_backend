const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = { Record };