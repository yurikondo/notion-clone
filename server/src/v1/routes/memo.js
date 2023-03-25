const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

//ログインしているユーザーが作成したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

module.exports = router;
