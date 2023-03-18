import { Container, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";

const Authlayout = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン
        </Box>
      </Container>
      <Outlet />
    </div>
  );
};

export default Authlayout;
