const jwt = require("jsonwebtoken");
const user_Register = require("../models/register");
const express = require("express");
const app = express();

const hbs = require("hbs");

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(express.static(__dirname + "/assets"));
const path = require("path");

const template_path = path.join(__dirname, "/templates/views");
const partials_path = path.join(__dirname, "/templates/partials");
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
const user_auth = async (req, res, next) => {
  try {
    
    console.log("kkdjsfksdjd");
    const token = req.cookies.jwt;
    console.log(req.cookies);
    console.log(token,"token");
    const verifyUser = jwt.verify(token, "mmmmmmmmmmmmmmmmmmmmmmm");
    console.log(verifyUser,"jijfd");
    const user = await user_Register.findOne({ _id: verifyUser._id });
    console.log(user.firstname, "my");
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
      console.log(err);
    res.status(401).render("error");
  }
};
module.exports = user_auth;
