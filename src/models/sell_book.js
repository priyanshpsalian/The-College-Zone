const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  
  sold_by: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
   
  },
 
  img:
    {
        data: Buffer,
        contentType: String,
    }
  
});

const book_data = new mongoose.model("book_data", book);
module.exports = book_data;
