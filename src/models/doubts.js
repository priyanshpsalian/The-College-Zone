const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const doubt = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  answers: [Array],
 
  
});

const doubt_data = new mongoose.model("doubt_data", doubt);
module.exports = doubt_data;
