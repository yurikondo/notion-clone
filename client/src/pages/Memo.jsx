import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, IconButton } from "@mui/material";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import memoApi from "../api/memoApi";
import { setMemo } from "../redux/features/memoSlice";

const Memo = () => {
  const { memoId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const memos = useSelector((state) => state.memo.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
      } catch (error) {
        alert(error.message);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);
      const newMemos = memos.filter((e) => e._id !== memoId);

      if (newMemos.length < 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }

      dispatch(setMemo(newMemos));
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
