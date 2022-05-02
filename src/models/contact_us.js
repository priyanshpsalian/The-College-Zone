const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const post1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
   
  },
//   description: {
//     type: String,
//     required: true,
   
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   img: {
//     type: String,
//     required: true,
//     default: 'placeholder.jpg',
//   },
  
});
// post1.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign({ _id: this._id }, "mmmmmmmmmmmmmmmmmmmmmmm");
//     console.log(token);
//     //this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };
// employeescheema1.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     console.log(`the password is ${this.password}`);
//     this.password = await bcrypt.hash(this.password, 10);
//     console.log(`the password is ${this.password}`);
//   }
//   next();
// });
const contact_data = new mongoose.model("contact_data", post1);
module.exports = contact_data;
