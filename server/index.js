const express = require("express");
const mongoose = require("mongoose"); //npm i mongoose
const CryptoJs = require ("crypto-js"); //npm i crypto-js
const User = require("./src/v1/models/user");
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

//ユーザー新規登録API・New user registration API
app.post("register", async (req, res) => {
  //パスワードの受け取り・Receipt of password
  const password = req.body.password;

  try {
    //パスワードの暗号化・Password encryption
    //https://www.npmjs.com/package/crypto-js
    req.body.password = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成・Create a new user
    //MongoDBに処理を行う場合、非同期でやり取りする
    const user = await User.create(req.body);
  } catch (error) {
    
  }
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・Local server running 🚀");
});