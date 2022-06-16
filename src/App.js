import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import MainPage from "./pages/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import Workout from "./pages/Workout/Workout";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="body">
        <Header />
        <MessageBox />
        {isLoading ? <Loading /> : null}
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/other" element={<CategoriesPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
