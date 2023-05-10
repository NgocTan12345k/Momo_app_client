// import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Register from "./components/Auth/Register";
// import Login from "./components/Auth/Login";
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import ChangePassword from "./components/Auth/ChangePassword";
// import Home from "./components/pages/Home/Home";
import { privateRoutes, publicRoutes } from "./routes/Routes";
import { DefaultLayout } from "./components/Layouts/Layout";
import React, { Fragment } from "react";

function App() {
  const ProtectRoute = ({ children }) => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((item, index) => {
          const Pages = item.component;
          let Layout = DefaultLayout;
          if (item.layout) {
            Layout = item.layout;
          } else if (item.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index + 1}
              path={item.path}
              element={
                <Layout>
                  <Pages />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((item, index) => {
          const Pages = item.component;
          let Layout = DefaultLayout;
          if (item.layout) {
            Layout = item.layout;
          } else if (item.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index + 1}
              path={item.path}
              element={
                <Layout>
                  <Pages />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
