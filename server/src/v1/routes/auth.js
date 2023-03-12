const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const JWT = require("jsonwebtoken"); //npm i jsonwebtoken
const CryptoJs = require("crypto-js"); //npm i crypto-js
require("dotenv").config(); //npm i -D dotenv


//ユーザー新規登録API・New user registration API
router.post(
  "/register",
  body("username")
    .isLength({ min: 5 })
    .withMessage("ユーザー名は5文字以上である必要があります。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります。"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります。"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーはすでに使われています");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
  async (req, res) => {
    //パスワードの受け取り・Receipt of password
    const password = req.body.password;
    try {
      //パスワードの暗号化・Password encryption
      //https://www.npmjs.com/package/crypto-js
      req.body.password = CryptoJs.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      //ユーザーの新規作成・Create a new user
      //MongoDBに処理を行う場合、非同期でやり取りする
      const user = await User.create(req.body);
      //JWTの発行・JWT publication
      //user._id は、各ユーザーごとに割り振られたMONGODBに保存されているユーザーのID
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      //userとtoken情報をjson形式で返す・Return user and token information in json format
      //json()はjson形式のものを入れる
      return res.status(200).json({ user: user, token: token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;