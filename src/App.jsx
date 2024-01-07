import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

//pages
import Home from "./pages/Home";
import CreateFeed from "./pages/CreateFeed";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import BlogPost from "./pages/BlogPost";
import Search from "./pages/Search";
import MyProfile from "./pages/MyProfile";
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/createfeed" exact element={<CreateFeed />}></Route>
        <Route path="/create-account" exact element={<SignUp />}></Route>
        <Route path="/signin" exact element={<SignIn />}></Route>
        <Route
          path="/blog/:category/:postId"
          exact
          element={<BlogPost />}
        ></Route>
        <Route path="/search" exact element={<Search />}></Route>
        <Route path="/my-profile" exact element={<MyProfile />}></Route>
        <Route path="/edit-profile" exact element={<EditPost />}></Route>
        <Route path="/about" exact element={<About />}></Route>
        <Route path="/contact" exact element={<Contact />}></Route>
        <Route path='*' exact element={<Error404/>}></Route>
        <Route
          path="/blog/:category/*"
          exact
          element={<Error404 />}
        ></Route>
        <Route
          path="/blog/*"
          exact
          element={<Error404 />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
