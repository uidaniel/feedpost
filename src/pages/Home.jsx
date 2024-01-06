import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Posts from "../components/Posts";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import Marque from "../components/Marque";

import { Link, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "../firebase";

const PostIcon = () => {
  const animationTransition = {
    duration: 1, // Set the duration of each animation cycle
    ease: "easeInOut", // Set the easing function
    repeat: Infinity, // Set the number of times to repeat (Infinity for an infinite loop)
    repeatType: "reverse", // Set the repeat type (can be 'loop', 'mirror', or 'reverse')
  };

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userDetails = user;
      setCurrentUser(userDetails);
    });

    return () => unsubscribe(); // Detach the listener on component unmount
  }, []);

  return (
    <div className="w-[100%] h-[100px] fixed z-10 flex bottom-0 left-0 p-4">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.3 }}
        transition={animationTransition}
        to="/createfeed"
        className="bg-[#FF2424] rounded-full flex items-center justify-center w-[70px] h-[70px] fixed right-0 mr-6 md:mr-10"
        onClick={() => {
          if (currentUser) {
            navigate("/createfeed");
          } else {
            navigate("/signin");
          }
        }}
      >
        <Link to="/createfeed">
          <FiEdit color="white" size={30} />
        </Link>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  <footer className="bg-black h-[200px] relative">
      <h1 className="text-white tracking-tighter text-[30px] font-bold ps-6 pt-4">
        FEEDPOST
      </h1>
      <div className="p-6 flex gap-4">
        <p className="text-white">Home</p>
        <p className="text-white">Categories</p>
        <p className="text-white">About FeedPost</p>
        <p className="text-white">Contact</p>
      </div>
      <div className="absolute bottom-0 border-t-2 w-[100%] pt-[15px] pb-[15px] text-center">
        <p className="text-white">
          Copyright © 2024 |{" "}
          <span className="text-[#FF2424]">Uwak Daniel</span>
        </p>
      </div>
    </footer>
}

const Home = () => {
  return (
    <>
      <section className="m-0 p-0 bg-[#fcf7df] h-[100vh]">
        <Navbar />
        <Categories />
        <Posts />
        <Footer/>
        <PostIcon />
      </section>
    </>
  );
};

export default Home;
