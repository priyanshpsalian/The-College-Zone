const express = require("express");
const app = express();
require("./src/db/conn");
const port = process.env.PORT || 5000;
const hbs = require("hbs");
const Register = require("./src/models/register");
const admin_register = require("./src/models/fridge_items");
const book_data = require("./src/models/sell_book");
const post_data = require("./src/models/postdata");
const confession = require("./src/models/confess");
const doubt_model = require("./src/models/doubts");
const info_model = require("./src/models/info");
const auth = require("./src/middleware/auth");
const user_auth = require("./src/middleware/user_auth");
const nodemailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const static_path = path.join(__dirname, "/public");
const static_path1 = path.join(__dirname, "/assets");
const template_path = path.join(__dirname, "/templates/views");
const partials_path = path.join(__dirname, "/templates/partials");
var imgModel = require('./src/models/model');
const fetch =require('isomorphic-unfetch');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const formData = require("form-data");
const fs = require("fs");
const https = require("https");
const mailer = "newbiesthealgorithmic@gmail.com";
const multer = require("multer");
var item_ai;
require('dotenv/config');
// const scanner=require "receipt-scanner";


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});



var upload = multer({ storage: storage })


// const upload = multer({ dest: "./public/data/uploads/" });`
const { Mongoose } = require("mongoose"); ``
const { render } = require("express/lib/response");
const { json } = require("body-parser");
const confess_data = require("./src/models/confess");
// const doubt_data = require("./src/models/doubts");
var email1;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/post_assets"));
// app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/temp", (req, res) => {
  res.render("temp");
});
// app.get("/userf", (req, res) => {
//   res.render("userf");
// });
// app.get("/adminf", (req, res) => {
//   res.render("adminf");
// });
// app.get("/image_up", (req, res) => {
//   res.render("image_up");
// });
// app.get("/image_up2", (req, res) => {
//   res.render("image_up2");
// });
app.get("/aboutus", (req, res) => {
  res.render("about");
});
app.get("/contactus", (req, res) => {
  res.render("contact");
});
app.get("/userLoggedIn", (req, res) => {
  res.render("userSignedHome");
});
app.get("/committeeheadLoggedIn", (req, res) => {
  res.render("admin_home");
});
app.get("/error", (req, res) => {
  res.render("error");
});


app.get("/upload2", (req, res) => {
  res.render("upload2");
});
app.get("/home", user_auth, async (req, res) => {
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  // console.log(token);
  const verifyUser = jwt.verify(token, "mmmmmmmmmmmmmmmmmmmmmmm");
  // console.log(verifyUser);
  var id = await Register.findOne({ _id: verifyUser._id });

  // var id = await Register.findOne({ email: email });
  // console.log(id.items[0][1].item_name);


  res.render("userSignedHome");
});
app.get("/home_user", user_auth, async (req, res) => {
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  // console.log(token);
  const verifyUser = jwt.verify(token, "mmmmmmmmmmmmmmmmmmmmmmm");
  // console.log(verifyUser);
  var id = await Register.findOne({ _id: verifyUser._id });

  // var id = await Register.findOne({ email: email });
  // console.log(id.items[0][1].item_name);


  res.render("home_user");
});
app.get("/admin_home", auth, async (req, res) => {
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  // console.log(token);
  const verifyUser = jwt.verify(token, "mmmmmmmmmmmmmmmmmmmmmmm");
  // console.log(verifyUser);
  var id = await admin_register.findOne({ _id: verifyUser._id });

  // var id = await Register.findOne({ email: email });
  // console.log(id.items[0][1].item_name);


  res.render("admin_home");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  console.log(req.cookies.jwt);
  res.render("login");
});
app.get("/adminf", (req, res) => {

  res.render("adminf");
});
app.get("/admin_login", (req, res) => {

  res.render("admin_login");
});
app.get("/admin_register", (req, res) => {

  res.render("admin_register");
});
app.get("/add_items", (req, res) => {
  res.render("add_items");
});
app.get("/apply", (req, res) => {
  res.render("apply");
});

app.post("/register", async (req, res) => {
  try {
    // res.send(req.body.email);
    // console.log(req.body.email);
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password == cpassword) {
      //   console.log("hi");
      //   const securepassword = async (password) => {
      //     var passwordHash = await bcrypt.hash(password, 10);
      //     console.log(passwordHash);
      //     return String(passwordHash);
      //   };
      email1 = req.body.email;
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        email: req.body.email,
        // password: securepassword(password),
        password: password,
        confirmpassword: cpassword,
      });
      const token = await registerEmployee.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 50000),
        httpOnly: true,
      });
      const registered = await registerEmployee.save();
      res.status(201).render("userSignedHome");
    } else {
      res.send("password not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/admin_register", async (req, res) => {
  try {
    // res.send(req.body.email);
    console.log(req.body.email);
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password == cpassword) {
      //   console.log("hi");
      //   const securepassword = async (password) => {
      //     var passwordHash = await bcrypt.hash(password, 10);
      //     console.log(passwordHash);
      //     return String(passwordHash);
      //   };
      email1 = req.body.email;
      const registeradmin = new admin_register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        email: req.body.email,
        // password: securepassword(password),
        password: password,
        confirmpassword: cpassword,
      });
      const token = await registeradmin.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 50000),
        httpOnly: true,
      });
      const registered = await registeradmin.save();
      res.status(201).render("admin_home");
    } else {
      res.send("password not matching");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.get("/secrets", auth, (req, res) => {
  res.render("secrets");
});
app.get("/logout", auth, async (req, res) => {
  try {
    //for deleting from all devices
    // req.user.tokens = [];

    res.clearCookie("jwt");

    console.log("loged out");
    await req.user.save();
    res.render("login");
  } catch (err) {
    console.log("log", err);
    res.status(500).send(err);
  }
});
app.post("/login", async (req, res) => {
  try {
    email1 = req.body.email;
    const email = req.body.uname;
    const password = req.body.psw;
    const useremail = await Register.findOne({ email: email });

    console.log(useremail, useremail.password);
    const isMatch = await bcrypt.compare(password, useremail.password);
    const id = useremail._id;

    const token = await useremail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    if (isMatch) {
      res.status(201).redirect("home");
    } else {
      res.send("password not matching");
    }
    console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(400).send("invalid Email");
  }
});
app.post("/admin_login", async (req, res) => {
  try {
    email1 = req.body.email;
    const email = req.body.uname;
    const password = req.body.psw;
    const useremail = await admin_register.findOne({ email: email });

    console.log(useremail, useremail.password);
    const isMatch = await bcrypt.compare(password, useremail.password);
    const id = useremail._id;

    const token = await useremail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    if (isMatch) {

      res.status(201).redirect("admin_home");
    } else {
      res.send("password not matching");
    }
    console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (error) {
    console.log(error);
    console.log("asfsaaaaaaaaaaaaaaaaaa");
    res.status(400).send("invalid Email");
  }
});
app.post("/upload", upload.single('image'), async (req, res) => {
  try {


    console.log(req.body.firstname);
    // console.log(req.body.image);
    console.log(req.file.filename);

    console.log(req.body);
    const post = new post_data({
      title: req.body.firstname,
      attach_links: req.body.lastname,
      importance: req.body.gender,
      phone: req.body.phone,
      date: String(req.body.age).slice(0, 10),
      main_link: req.body.email,
      description: req.body.description,
      // password: securepassword(password),
      img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
    });
    post_data.create(post, (err, item) => {
      if (err) {
        console.log(err);
      }
      else {
        // item.save();
        res.redirect('/');
      }
    });
    // const post_done = await post.save();
    // res.status(201).render("admin_home");


  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.get("/upload", (req, res) => {
  res.render("upload");
});

// app.get("/post", async (req, res) => {
//   try {
//     post_data.find({}, async function (err, users) {
//       if (err) {
//         console.log(err);
//       }
//       console.log(users[0].title, "JJJJJ");
//       console.log(users, "iiiiiiiiiiii");
//       // console.log(da.schema);
//       res.render("post", { da: users })
//     });


//   } catch (err) {
//     console.log(err, "kkkkkkkkk");
//   }

// })
app.post("/confess", async (req, res) => {
  try {
    const confess_data = new confession({
      title: req.body.firstname,
      attach_links: req.body.lastname,


    })
    const confess_done = await confess_data.save();
    res.render("userSignedHome");

  } catch (err) {
    console.log(err);
  }


})
app.get("/confess", async (req, res) => {
  res.render("confess");
})
app.get("/confession_view", async (req, res) => {
  try {
    confess_data.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      console.log(users);
      res.render("confession_view", { da: users });

    })

  }
  catch (error) {
    console.log(error);

  }

})

app.post("/sell_book", upload.single('image'), async (req, res) => {
  try {
    console.log(req.body.price);
    const book_data_fun = new book_data({
      title: req.body.title,
      discription: req.body.discription,
      phone: req.body.phone,

      price: req.body.price,
      sold_by: req.body.sold_by,
      img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }

    })
    const book_done = await book_data_fun.save();
    res.render("userSignedHome");

  } catch (err) {
    console.log(err);
  }

})

app.get("/sell_book", async (req, res) => {
  res.render("sell_book");
})


app.get("/see_books", async (req, res) => {
  try {
    book_data.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      // console.log(users);
      res.render("see_books", { da: users });
    })
  }
  catch (error) {
    console.log(error);
  }
})


const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("d72eaa6e253d95441f1215c0cf9e4e5d449655178c1a1578bac8ac0cbd5fcb2e");

const params = {
  engine: "google_jobs",
  domain: "web",
  q: "web",
  google_domain: "google.co.in",
  gl: "in",
  hl: "hi",
  location: "Mumbai, India"
};


app.get("/see_jobs", async (req, res) => {
  try {
    const callback = function (data) {
      // console.log(data.jobs_results);

      res.render("see_jobs", { da: data.jobs_results })
    };
    search.json(params, callback);
    // res.render("see_jobs")

  }
  catch (error) {
    console.log(error);

  }

})

hbs.registerHelper('slicer', function (context) {
  let sliced = context.slice(0,390) + ".....";
  return sliced;
});

app.post("/search_jobs", async (req, res) => {
  try {
    console.log(req.body.query);

    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("d72eaa6e253d95441f1215c0cf9e4e5d449655178c1a1578bac8ac0cbd5fcb2e");

    const params = {
      engine: "google_jobs",
      domain: "software",
      q: `${req.body.query}`,
      google_domain: "google.co.in",
      gl: "in",
      hl: "hi",
      location: "Mumbai, India"
    };
    const callback = function (data) {
      console.log(data.jobs_results);
      res.render("see_jobs", { da: data.jobs_results });
      // res.redirect("see_jobs", { da: data.jobs_results })
    };
    search.json(params, callback);


  } catch (err) {
    console.log(err);
  }

})
app.get("/see_books_data", async (req, res) => {
  try {
    book_data.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      // console.log(users);
      res.send(users);

    })

  }
  catch (error) {
    console.log(error);

  }

})
app.get("/paid_google_books", async (req, res) => {
  res.render("paid_google_books");
})
app.get("/free_google_books", async (req, res) => {
  res.render("free_google_books");
})
app.get("/ask_doubt", async (req, res) => {
  res.render("ask_doubt");
})
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  // return window.btoa(binary);
  return btoa(binary);
};
app.get("/see_post", async (req, res) => {
  try {
    post_data.find({}, function (err, users) {
      if (err) {
        console.log(err);
      }
      // var us = JSON.parse(JSON.stringify(users));
      // console.log(users[10].img.contentType);
      // console.log(us[10]);
      // console.log(us[10].img.data.data);
      // var us2 = us[10].img.data.data;
      // var base64Flag = 'data:image/jpeg;base64,';
      // var imageStr = arrayBufferToBase64(us[11].img.data.data);
      // var us2 = base64Flag + imageStr;

      // console.log(users[0].img.data.toString('ascii'));

      res.render("see_post", { da: users });
    })
  }
  catch (error) {
    console.log(error);
  }
})

hbs.registerHelper('image', function (context) {
  return context.toString('base64');
});

app.get("/see_confession", async (req, res) => {
  try {
    confession.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      // console.log(users);
      res.render("see_confession", { da: users });

    })

  }
  catch (error) {
    console.log(error);

  }

})
const URL1 = "https://charitybase.uk/api/graphql"
const HEADERS1 = {
  Authorization: "Apikey 503e32f3-6a5b-4183-a7e0-ad5c5bfa725f",
  "Content-Type": "application/json",
}
const COUNT_QUERY = `
  {
    CHC {
      getCharities(
        filters: {  finances: { latestIncome: { gte: 100000 } } }
      ) {
        list(limit: 10) {
          id
          names {
            value
          }
          activities
          website
        }
      }
    }
  }
`

app.get("/see_charity", async (req, res) => {
  try {
    fetch(URL1, {
      method: "POST",
      headers: HEADERS1,
      body: JSON.stringify({ query: COUNT_QUERY }),
    })
      .then((res) => res.json())
      .then((da1) => res.render("see_charity", { da: da1.data.CHC.getCharities.list}))
      // .then((da1) => console.log(da1.data.CHC.getCharities.list[0].names[0].value))
      .catch((err) => {
        console.error("FETCH ERROR (probably your network)")
        throw err
      })

    // console.log(users);
    // res.render("see_charity", { da: da1 });

  }


  catch (error) {
    console.log(error);

  }

})
app.post("/ask_doubt", async (req, res) => {
  try {
    console.log(req.body.doubt);
    const doubt_data = new doubt_model({
      name: req.body.doubt_name,
      title: req.body.doubt_title,
      description: req.body.doubt,



    })
    const book_done = await doubt_data.save();
    res.render("userSignedHome");

  } catch (err) {
    console.log(err);
  }

})
app.post("/put_info", async (req, res) => {
  try {
    console.log(req.body.doubt);
    const doubt_data = new info_model({
      name: req.body.doubt_name,
      title: req.body.doubt_title,
      description: req.body.doubt,



    })
    const book_done = await doubt_data.save();
    res.render("userSignedHome");

  } catch (err) {
    console.log(err);
  }

})
app.get("/put_doubt", async (req, res) => {
  console.log("put22");
  res.render("put_doubt");
})
app.get("/put_info", async (req, res) => {
  // console.log("put22");
  res.render("put_info");
})
app.get("/see_doubts", async (req, res) => {
  try {
    doubt_model.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      // console.log(users);
      res.render("see_doubts", { da: users });

    })

  }
  catch (error) {
    console.log(error);

  }

})
app.post("/reply_doubt", async (req, res) => {
  try {
    // console.log(req.body.doubt_title[0]);

    // console.log(req.body.demo,"demo");
    // const doubt_data = new doubt_model({
    //   name:req.body.doubt_name,
    //   title: req.body.doubt_title,
    //   description: req.body.doubt,



    // })
    // const book_done = await doubt_data.save();
    // await doubt_model.findOneAndUpdate(
    //   {
    //     email: `${req.body.demo}`,
    //   },
    //   {
    //     $addToSet: {
    //       answers: req.body,
    //     },
    //   }
    // );
    console.log(req.body.demo[0]);

    res.render("put_ans", { da: req.body.demo[0] });

  } catch (err) {
    console.log("kkk");
    console.log(err);
  }

})
app.get("/see_info", async (req, res) => {
  try {
    info_model.find({}, function (err, users) {
      if (err) {
        console.log(err);

      }
      console.log(users);
      res.render("see_info", { da: users });

    })

  }
  catch (error) {
    console.log(error);

  }

})
app.get("/put_ans", async (req, res) => {
  res.render("put_ans");
})
app.post("/put_ans", async (req, res) => {
  try {
    console.log("put");
    console.log(req.body.doubt_title, "put");
    console.log(req.body.doubt);


    // console.log(req.body.demo,"demo");

    await doubt_model.findOneAndUpdate(
      {
        title: `${req.body.doubt_title}`,
      },
      {
        $addToSet: {
          answers: req.body.doubt,
        },
      }
    );
    res.render("userLoggedIn");

  } catch (err) {
    console.log("put11");
    console.log(err);
  }

})
app.listen(port, () => {
  console.log(`is listening at port${port}`);
})
