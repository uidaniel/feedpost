import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore, onAuthStateChanged, signOut } from "../firebase";
import {
  userEmail,
  userProfilePicture,
  usersName,
  setUserId,
} from "../store/store";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullname = useSelector((state) => state.userName);
  const emailaddress = useSelector((state) => state.userEmail);
  const profilepic = useSelector((state) => state.profilePicture);
  const userName = useSelector((state) => state.userName);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userID = user.uid; // Use user.uid directly
          setCurrentUser(userID);
        }
      });

      const userDocRef = doc(firestore, "users", currentUser);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        dispatch(userEmail(userData.EmailAddress));
        dispatch(usersName(userData.Name));
        dispatch(userProfilePicture(userData.ProfilePicture));
        dispatch(setUserId(currentUser));
      } else {
      }

      return () => unsubscribe(); // Detach the listener on component unmount
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="flex justify-between items-center px-4 md:px-8 pt-4 bg-[#fcf7df]">
      {isDrawerOpen && (
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="fixed top-0 left-0 z-[20] bg-black/30"
        >
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            exit={{ x: -1000 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[] bg-black/25"
          >
            <div className="w-[75vw] fixed top-0 left-0 bg-white h-[100vh] z-[40] ps-5 pe-5 pt-5">
              <div className="w-12 h-12 me-5 rounded-md bg-[#000] flex justify-center items-center md:hidden cursor-pointer text-[#fff]">
                <IoClose
                  size={32}
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                />
              </div>
              <div className="mt-8 flex flex-col justify-between">
                <ul className="flex flex-col gap-8">
                  <li
                    className="text-[28px] hover:font-bold hover:text-[#FF2424] cursor-pointer"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <span>&gt;</span> Home
                  </li>
                  <li
                    className="text-[28px] hover:font-bold hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    <span>&gt;</span> About
                  </li>
                  <li
                    className="text-[28px] hover:font-bold hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
                    onClick={() => {
                      navigate("/my-profile");
                    }}
                  >
                    <span>&gt;</span> Profile
                  </li>
                  <li
                    className="text-[28px] hover:font-bold hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    <span>&gt;</span> Contact
                  </li>
                </ul>
                {currentUser && (
                  <div className="flex items-center justify-between mt-[30vh]">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-md bg-[#FFE4E4] flex justify-center items-center">
                        <img
                          src={
                            profilepic
                              ? profilepic
                              : "https://bafybeihngeb4mfzcbb26gmrjno7yaynjtkgvhigesyrerpbgtrvqpt26x4.ipfs.w3s.link/Frame 34.png"
                          }
                          alt=""
                          className="w-[100%] h-[100%] rounded-md"
                        />
                      </div>
                      <div className="ms-3">
                        <p className="font-bold text-[16px]">{fullname}</p>
                        <p className="text-[14px]">{emailaddress}</p>
                      </div>
                    </div>
                    <IoMdExit
                      color="red"
                      size={30}
                      className="md:ms-5"
                      onClick={() => {
                        signOut(auth)
                          .then(() => {
                            setCurrentUser(false);
                            dispatch(usersName(""));
                          })
                          .catch((error) => {
                            // Handle errors if any
                          });
                      }}
                    />
                  </div>
                )}
                {!currentUser && (
                  <div className="flex flex-col gap-2 mt-[20vh]">
                    <Link
                      to="/signin"
                      className="w-[100%] h-[50px] flex items-center justify-center rounded-[5px] text-[#FF2424] bg-[#FFE4E4] cursor-pointer decoration-none"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/create-account"
                      className="w-[100%] h-[50px] flex items-center text-white rounded-[5px] font-bold justify-center bg-[#FF2424] decoration-none"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="flex">
        <div
          className="w-12 h-12 me-5 rounded-md bg-[#000] flex justify-center items-center md:hidden cursor-pointer text-[#fff]"
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <FiMenu size={32} />
        </div>
        <img
          src="https://bafybeigfti5usy3rsztdbbqu2bnox4fbbvykrueijnmeoaw625xglbo7xq.ipfs.w3s.link/FeedPost Logo.svg"
          className="w-[150px] z-[2] cursor-pointer"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      {currentUser && (
        <div className="flex items-center">
          <ul className="hidden md:flex md:gap-6 items-center me-10">
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/my-profile");
              }}
            >
              Profile
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact
            </li>
          </ul>
          <div onClick={()=> {
            navigate('/search')
          }}
            className="w-12 h-12 rounded-md bg-[#FFE4E4] flex justify-center items-center cursor-pointer"
          >
            <FiSearch color="#FF2424" size={28}/>
          </div>
          <div className="md:flex md:ms-3 ms-3 flex items-center">
            <Link
              to="/my-profile"
              className="w-12 h-12 rounded-md bg-[#FFE4E4] flex justify-center items-center"
            >
              <img
                src={
                  profilepic
                    ? profilepic
                    : "https://bafybeihngeb4mfzcbb26gmrjno7yaynjtkgvhigesyrerpbgtrvqpt26x4.ipfs.w3s.link/Frame 34.png"
                }
                alt=""
                className="w-[100%] h-[100%] rounded-md"
              />
            </Link>
            <div className="hidden ms-3 md:block">
              <p className="font-bold">{fullname}</p>
              <p className="text-[14px]">{emailaddress}</p>
            </div>
            <IoMdExit
              color="red"
              size={40}
              className="hidden md:block md:ms-5"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    setCurrentUser(false);
                  })
                  .catch((error) => {
                    // Handle errors if any
                  });
              }}
            />
          </div>
        </div>
      )}
      {!currentUser && (
        <div className="flex items-center">
          <ul className="hidden md:flex md:gap-6 items-center me-10">
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/my-profile");
              }}
            >
              Profile
            </li>
            <li
              className="text-[#767676] hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact
            </li>
          </ul>
          <div className="w-12 h-12 rounded-md bg-[#FFE4E4] flex justify-center items-center cursor-pointer" onClick={()=> {
            navigate('/search')
          }}>
            <FiSearch color="#FF2424" size={28} onClick={()=> {
              navigate('/search')
            }}/>
          </div>
          <div className="hidden md:flex ">
            <Link
              to="/signin"
              className="w-28 h-12 ms-4 rounded-[10px] justify-center bg-[#FFE4E4] flex items-center text-[#FF2424] cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to="create-account"
              className="w-28 h-12 ms-2 rounded-[10px] justify-center bg-[#FF2424] flex items-center text-white cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
