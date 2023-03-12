const JWT = require("jsonwebtoken"); //npm i jsonwebtoken
const CryptoJs = require("crypto-js"); //npm i crypto-js
const User = require("../models/user");

exports.register = async (req, res) => {
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
