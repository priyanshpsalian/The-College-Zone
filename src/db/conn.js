const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://user1:1234@clubzone.12dvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
// .connect("mongodb://localhost:27017/ClubZone", {  
  // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log(`connection is successful`);
  })
  .catch((e) => {
    console.log(`no connection`, e);
  });
