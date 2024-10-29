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
import { signUp } from "../../../api/user/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/userSlice";

const SignUp = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      age: Yup.string().required("Age is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        age: values.age,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const response = await signUp(data);
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
        setError(response.data.message);
        setTimeout(() => setError(false), 2500);
      }
    },
  });

  return (
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
        Create an Account
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
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
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
          fullWidth
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
