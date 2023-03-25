import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      navigate(`/memo/${res._id}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
}

export default Home;
