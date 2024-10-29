import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../api/user/internal";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../../../store/userSlice";

const Home = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        dispatch(resetUser());
        navigate("/");
      } else {
        console.error("Logout failed", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.firstName || "User"}
      </Typography>
      <Card variant="outlined" sx={{ width: "100%", mt: 2 }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            User Details
          </Typography>
          <Box mt={2}>
            <Typography variant="body1">
              <strong>ID:</strong> {user._id || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>First Name:</strong> {user.firstName || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong> {user.lastName || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {user.age || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address || "N/A"}
            </Typography>
            {user.auth && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 3 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
