const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Femele", "Other"],
    required: true,
  },
  profile_pic: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student