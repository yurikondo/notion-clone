const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    //メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    //メモを全て取得
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません🗒");
    res.status(200).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};
