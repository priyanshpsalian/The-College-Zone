const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const employeescheema1 = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  
});
employeescheema1.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, "mmmmmmmmmmmmmmmmmmmmmmm");
    console.log(token);
    //this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};
employeescheema1.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the password is ${this.password}`);
  }
  next();
});
const Register_admin = new mongoose.model("Register_admin", employeescheema1);
module.exports = Register_admin;
