import React, { useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res);
        dispatch(setMemo(res));
        console.log(memos);
      } catch (error) {
        alert(error);
      }
    };
    getMemos();
  }, []);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined></LogoutOutlined>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り{" "}
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize="small"></AddBoxOutlined>
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Typography sx={{ pl: "20px" }} component={Link} to="/memo/afdfs">
            🗒仮置きのメモ
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <Typography sx={{ pl: "20px" }} component={Link} to="/memo/afdfs">
            🗒仮置きのメモ
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <Typography sx={{ pl: "20px" }} component={Link} to="/memo/afdfs">
            🗒仮置きのメモ
          </Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
