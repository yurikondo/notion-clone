const express = require("express");
const mongoose = require("mongoose"); //npm i mongoose
const app = express();
const PORT = 4000;
require("dotenv").config(); //npm i -D dotenv
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// json形式でデータを受信したい場合はexpress.json()が必須
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

//DB接続・DB connection
try {
  //expected connection string to start with mongodb+srv:// using process.env
  //https://www.mongodb.com/community/forums/t/unable-to-connect-db-because-of-throw-new-mongoparseerror-invalid-scheme-expected-connection-string-to-start-with-mongodb-or-mongodb-srv/176629/5
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・Connecting to DB 🍏");
} catch (error) {
  console.log(`DBと接続時にエラー発生:${error}`);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・Local server running 🚀");
});
