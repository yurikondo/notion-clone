const JWT = require("jsonwebtoken");
const User = require("../models/user");

//クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  console.log(req);
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証するためのミドルウェア
exports.verifyToken = async (res, req, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecode) {
    //そのJWTを一致するユーザーを探してくる
    const user = await User.findById(tokenDecode.id);

    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
