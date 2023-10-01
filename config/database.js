const mongoose = require("mongoose");
const URL =
"mongodb+srv://sachinikuruppu:passionfruit123@cluster0.ddynchj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
  

const connectDB = async () => {
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection fail");
  }
};

module.exports = connectDB;
