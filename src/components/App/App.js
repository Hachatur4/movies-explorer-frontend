import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundError from "../NotFoundError/NotFoundError";
import ProtectedRouteElement from "../ProtectedRoute";
import NavTab from "../Main/NavTab/NavTab";



function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      <ProtectedRouteElement
        loggedIn={loggedIn}
        elementOne={Header}
        elementTwo={NavTab}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={loggedIn ? <Navigate to="/" replace /> : <NotFoundError />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
