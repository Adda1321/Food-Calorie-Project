
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adilmustafa:80QisUKB8TYY48Jz@cluster0.qckoshq.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (e) {
    console.log("ERROR Occured at mongoos config", e);
  }
};

connectDB();

require('./model')
 
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

app.use('/api/', require('./routes'));

 
app.listen(port);
console.log("Server started at http://localhost:" + port);
