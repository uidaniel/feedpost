import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { useSelector, useDispatch } from "react-redux";
import { MdCampaign } from "react-icons/md";
import { updateDoc, getDocs, collection } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import { updatePassword, sendEmailVerification } from "firebase/auth";
import { firestore } from "../firebase";
import { doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { auth, onAuthStateChanged } from "../firebase";
import { usersName, userEmail } from "../store/store";

const EditPost = () => {
  const userName = useSelector((state) => state.userName);
  const userEmail = useSelector((state) => state.userEmail);
  const profilepic = useSelector((state) => state.profilePicture);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");
  const [fileTrue, setFileTrue] = useState(false);
  const [pictureUpdating, setPictureUpdating] = useState(false);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [toastMessage, setToastMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
      setFileTrue(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userDetails = user;
      setCurrentUser(userDetails);
    });

    return () => unsubscribe(); // Detach the listener on component unmount
  }, []);

  useEffect(() => {
    const theFirebase = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const theUsers = [];
      querySnapshot.forEach((doc) => {
        theUsers.push({ docID: doc.id, ...doc.data() });
      });

      const particularUser = theUsers.filter((user) => user.Name == userName);
      console.log(particularUser);
      particularUser.map((user) => setCurrentUserData(user.docID));
    };

    theFirebase();
  }, []);

  const handleEditProfile = async () => {
    setButtonLoading(true);
      setPictureUpdating(false);
      
      const updateRef = doc(firestore, 'users', currentUserData);
      try {
        await updateDoc(updateRef, {
          Name: fullName,
        });

        dispatch(usersName(fullName))
        setSuccessMessage("Your profile has been updated.");
        setToastSuccessMessage(true);
        setButtonLoading(false)
        setTimeout(()=> {
            setToastSuccessMessage(false)
        }, 2500)
      } catch (e) {
        setErrorMessage(e.message);
        setToastMessage(true);
        setButtonLoading(false)
      }
  };

  const handleUpdatingPicture = async () => {
    const pictureRef = doc(firestore, "users", currentUserData);
    setPictureUpdating(true);
    setFileTrue(false);
    try {
      await updateDoc(pictureRef, {
        ProfilePicture: selectedImage,
      });
      setPictureUpdating(false);
      setSuccessMessage("Your Image has been updated successfully");
      setToastSuccessMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (e) {
      setErrorMessage("You image was not updated");
      setToastMessage(true);
    }
  };

  return (
    <section>
      {toastSuccessMessage && (
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          className="fixed top-4 left-[10vw] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between"
        >
          <div className="flex items-center">
            <FaCheckCircle size={60} color="#22c55e" className="ms-3" />
            <p className=" text-[14px] ms-5 w-[90%]">
              <span className="text-green-500 font-bold">Success: </span>
              {successMessage}
            </p>
          </div>
          <IoMdClose
            size={40}
            className="me-3"
            onClick={() => {
              setToastSuccessMessage(false);
            }}
          />
        </motion.div>
      )}
      {toastMessage && (
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          className="fixed top-4 left-[10vw] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between"
        >
          <div className="flex items-center">
            <FcCancel size={60} color="#FF2424" className="ms-3" />
            <p className=" text-[14px] ms-5 w-[90%]">
              <span className="text-[#FF2424] font-bold">Error: </span>
              {errorMessage}
            </p>
          </div>
          <IoMdClose
            size={40}
            className="me-3"
            onClick={() => {
              setToastMessage(false);
            }}
          />
        </motion.div>
      )}
      <div className="w-100 flex gap-4 bg-black/90 text-white items-center py-5 px-7">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoArrowBackOutline size={30} />
        </div>
        <p className="text-2xl font-bold">Edit Profile</p>
      </div>
      <div className="p-5">
        <div className="flex gap-6 items-center">
          <div className="min-w-[130px] min-h-[130px] rounded-full border mb-6 bg-white">
            <img
              src={
                profilepic
                  ? profilepic
                  : "https://bafybeihngeb4mfzcbb26gmrjno7yaynjtkgvhigesyrerpbgtrvqpt26x4.ipfs.w3s.link/Frame 34.png"
              }
              alt=""
              className="w-[100%] h-[100%] rounded-full"
            />
          </div>
          <div>
            <p className="mb-4">Change Profile Picture to</p>
            <input
              type="file"
              accept="image/*"
              className="bg-[#FF2424] text-white"
              onChange={handleImageChange}
            />
            {fileTrue && (
              <div
                className="w-[100px] h-[40px] rounded-full flex justify-center items-center text-white bg-[#FF2424] mt-4 cursor-pointer"
                onClick={handleUpdatingPicture}
              >
                Update
              </div>
            )}
            {pictureUpdating && (
              <div className="text-[#FF2424] mt-4">Updating..</div>
            )}
          </div>
        </div>
        <div className="mt-3 mb-5">
          <label htmlFor="Post Title">
            Full Name<span className="text-[#FF2424]"></span>
          </label>
          <input
            type="text"
            className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        {/* <div className="mt-3 mb-5">
          <label htmlFor="Post Title">
            Email Address<span className="text-[#FF2424]"></span>
          </label>
          <input
            type="text"
            className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mt-3 mb-5">
          <label htmlFor="Post Title">
            New Password<span className="text-[#FF2424]"></span>
          </label>
          <input
            type="text"
            className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-[#FF2424] text-[14px] mt-2">
            Leave blank if you don't want to change your password
          </p>
        </div> */}
        <div
          className="w-[100%] h-[60px] rounded-[10px] flex items-center gap-2 justify-center bg-[#FF2424] text-white hover:bg-[#DD0000]"
          onClick={handleEditProfile}
        >
          {buttonLoading ? (
            <SyncLoader color="#fff" size={10} />
          ) : (
            <div className="flex gap-4">
              <p>Update Profile</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditPost;
