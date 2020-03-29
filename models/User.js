const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "",
    unique: true,
    required: true
  },
  email: {
    type: String,
    default: "",
    unique: true,
    required: true
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);