import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/user/login/Login";
import SignUp from "../pages/user/signUp/SignUp";
import Home from "../pages/user/home/Home";
import Spinner from "../components/spinner/Spinner";
import useAutoLogin from "../hooks/useAutoLogin";

const UserRoutes = () => {
  const isAuth = useSelector((state) => state.user.auth);
  const loading = useAutoLogin();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default UserRoutes;
