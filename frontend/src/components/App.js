import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Login } from "./Login";
import { Header } from "./Header";
import { Home } from "./Home";
import { Register } from "./Register";
import ProtectedRouteElement from "./ProtectedRouteElement";
import { authApi } from "../utils/AuthAPI";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [isLoggining, setIsLoggining] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("mestoReactToken")) {
      authApi
        .authMe(localStorage.getItem("mestoReactToken"))
        .then((value) => {
          setCurrentEmail(value.data.email);
          navigate("/");
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const [currentUser, setCurrentUser] = React.useState({
    about: "Неизвестный пользователь",
    avatar:
      "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png",
    cohort: "placeholder",
    name: "Аноним",
    _id: "placeholder",
    email: "placeholder@gmail.com",
  });

  return (
    <>
      <Header
        isLoggining={isLoggining}
        setIsLoggining={setIsLoggining}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        currentEmail={currentEmail}
        setCurrentEmail={setCurrentEmail}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Home}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route />
        <Route
          path="/sign-up"
          element={
            <Register
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          }
        />
        <Route />
        <Route
          path="/sign-in"
          element={
            <Login
              setCurrentEmail={setCurrentEmail}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
