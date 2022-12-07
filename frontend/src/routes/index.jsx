import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Home } from "../pages/Home";
import { LandingPage } from "../pages/LandingPage";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/home" />;
  }

  return children;
};

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export { Router };
