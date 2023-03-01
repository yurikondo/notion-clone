const express = require("express");
const mongoose = require("mongoose"); //npm i mongoose
const cryptoJs = require ("crypto-js"); //npm i crypto-js
const app = express();
const PORT = 3000;
require("dotenv").config(); //npm i -D dotenv

//DB接続・DB connection
try {
  //expected connection string to start with mongodb+srv:// using process.env
  //https://www.mongodb.com/community/forums/t/unable-to-connect-db-because-of-throw-new-mongoparseerror-invalid-scheme-expected-connection-string-to-start-with-mongodb-or-mongodb-srv/176629/5
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・Connecting to DB 🍏");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・Local server running 🚀");
});