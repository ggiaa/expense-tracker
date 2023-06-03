import { Box, Container, Typography } from "@mui/material";
import BottomNavbar from "./components/Menus/BottomNavbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          height: "97vh",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "91%", display: "flex", columnGap: 4 }}>
          <Outlet />
        </Box>
        <Box sx={{ height: "10%" }}>
          <BottomNavbar />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
