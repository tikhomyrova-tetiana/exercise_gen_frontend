import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
// import Navigation from "./components/Navigation";
import Header from "./components/Header/Header";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import MainPage from "./pages/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import { Container } from "@mui/system";
const Other = () => <h1>Other</h1>;

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Navigation /> */}
      <Header />
      <Container sx={{ mt: "100px" }}>
        <MessageBox />
        {isLoading ? <Loading /> : null}
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/other" element={<Other />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
