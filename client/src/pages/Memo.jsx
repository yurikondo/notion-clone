import React from "react";
import {
  TextField,
  List,
  ListItemButton,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import StarBoderOutlined from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

function Memo() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBoderOutlined />
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlined />
        </IconButton>
        Memo
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField placeholder="無題" variant="outlined" fullWidth />
        <TextField placeholder="追加" variant="outlined" fullWidth />
      </Box>
    </>
  );
}

export default Memo;
