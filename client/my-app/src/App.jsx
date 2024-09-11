import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PagenotFound from "./pages/PagenotFound";
import About from "./pages/About";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="*" element={<PagenotFound />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
