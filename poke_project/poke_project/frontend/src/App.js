import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Activate from "./pages/User/Activate";
import ResetPassword from "./pages/User/ResetPassword";
import ResetPasswordConfirm from "./pages/User/ResetPasswordConfirm";

import Pokedex from "./pages/Pokemon/Pokedex";
import CatchPoke from "./pages/Pokemon/CatchPoke";

// import ReactContext from "./context/react-context";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/catchpoke" element={<CatchPoke />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
