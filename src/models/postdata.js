const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const post1 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  attach_links: {
    type: String,
    required: true,
  },
  main_link: {
    type: String,
    required: true,
    
  },
  importance: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
   
  },
  description: {
    type: String,
    required: true,
   
  },
  date: {
    type: String,
    required: true,
  },
  img:
    {
        data: Buffer,
        contentType: String,
    }
  
});

const post_data = new mongoose.model("post_data", post1);
module.exports = post_data;
