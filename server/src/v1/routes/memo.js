const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

//ログインしているユーザーが作成したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//選択肢したメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

//選択肢したメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);


module.exports = router;
