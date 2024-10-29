import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageContainer from "../../../components/container/PageContainer";
import { login } from "../../../api/user/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      const response = await login(data);
      if (response.status === 200) {
        const user = {
          _id: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          age: response.data.user.age,
          address: response.data.user.address,
          auth: response.data.auth,
        };
        dispatch(setUser(user));
        navigate("/");
      } else {
        console.log(response.data.message);

        setError(response.data.message);
        setTimeout(() => setError(false), 2500);
      }
    },
  });

  return (
    <PageContainer title="Login" description="This is the Login page">
      <Container
        maxWidth="xs"
        sx={{
          mt: 0,
          p: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Skygoal User Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            fullWidth
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/sign-up")}
            sx={{ mt: 2 }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default Login;
