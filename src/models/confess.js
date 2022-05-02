const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const confess = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  attach_links: {
    type: String,
    required: true,
  },
 
  
});

const confess_data = new mongoose.model("confess_data", confess);
module.exports = confess_data;
