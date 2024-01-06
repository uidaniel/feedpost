import React, { useState, useEffect } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdImage } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdCampaign } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, usersName } from "../store/store";
import { LuPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Posts from "../components/Posts";
import SyncLoader from "react-spinners/SyncLoader";

const CreateFeed = () => {
  const [tagArray, setTagArray] = useState([]);
  const [tagText, settagText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const posts = useSelector((state) => state.posts);
  const usersName = useSelector((state) => state.userName);
  const authorId = useSelector((state) => state.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (toastMessage) {
    setTimeout(() => {
      setToastMessage(false);
    }, 5000);
  }

  if (toastSuccessMessage) {
    setTimeout(() => {
      setToastSuccessMessage(false);
      navigate("/");
    }, 2000);
  }

  const handleAddFeed = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    if (postTitle && postDescription && content && category && selectedImage) {
      setButtonLoading(true);

      const getCurrentDateFormatted = () => {
        const currentDate = new Date();

        const options = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-US", options);

        return formattedDate;
      };

      // Example usage:
      const formattedDate = getCurrentDateFormatted();

      const postId = posts.length;

      try {
        const docRef = await addDoc(collection(firestore, "posts"), {
          postId: postId,
          postAuthor: usersName,
          postAuthorId: authorId,
          postImage: selectedImage || "",
          postTitle: postTitle,
          postDescription: postDescription,
          content: content,
          category: category,
          tags: tagArray,
          postDate: formattedDate,
        });
        const documentID = docRef.id;
        if (documentID) {
          setToastSuccessMessage(true);
          setSuccessMessage("Your Feed has been posted");
        }
      } catch (e) {
        console.log("error");
        setButtonLoading(false);
      } finally {
        setIsSubmitting(false); // Reset isSubmitting when the submission is complete
      }
    } else {
      setToastMessage(true);
      setErrorMessage("Please input all required details asterisked");
    }
  };

  return (
    <section className="w-[100vw] overflow-x-hidden bg-[#fcf7df] h-[100vh]">
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
      <div className="w-100 flex gap-4 items-center py-5 px-7">
        <Link to="/">
          <IoArrowBackOutline size={30} />
        </Link>
        <p className="text-2xl font-bold">Create a New Feed</p>
      </div>
      <div className="p-3 md:flex ">
        <div className="flex flex-col justify-center items-center gap-3 bg-[#FF2424] h-[60px] rounded-[10px]">
          <input
            type="file"
            accept="image/*"
            className="bg-[#FF2424] text-white"
            onChange={handleImageChange}
          />
        </div>
        <div className="p-1 md:pt-0 md:w-[100%]">
          <div className="mt-3 mb-5">
            <label htmlFor="Post Title">
              Post Title<span className="text-[#FF2424]">*</span>
            </label>
            <input
              type="text"
              className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 mb-5">
            <label htmlFor="Post Title">
              Post Description<span className="text-[#FF2424]">*</span>
            </label>
            <input
              type="text"
              className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
              value={postDescription}
              onChange={(e) => {
                setPostDescription(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 mb-5">
            <label htmlFor="Content/Body">
              Content/Body<span className="text-[#FF2424]">*</span>
            </label>
            <textarea
              type="text"
              className="border rounded-[10px] block h-[400px] w-[100%] mt-1 ps-4 pe-6 pt-4 flex-wrap"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="Post Title">
              Category<span className="text-[#FF2424]">*</span>
            </label>
            <select
              name="category"
              id=""
              className="border rounded-[10px] pe-10 block h-[50px] w-[100%] mt-1 ps-4 md:w-[100%]"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="None">---Select</option>
              <option value="Politics">Politics</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="mt-3 mb-5">
            <label htmlFor="Post Title">
              Tags/Keywords<span className="text-[#FF2424]">*</span>
            </label>
            <div className="border rounded-[10px] h-[50px] w-[100%] mt-1 ps-4 flex justify-between pe-6 bg-white">
              <input
                type="text"
                className="w-[100%] h-[100%] focus:outline-none bg-white"
                value={tagText}
                onChange={(e) => {
                  const tagInput = e.target.value;
                  settagText(tagInput);
                }}
              />
              <div
                className="flex items-center text-[#FF2424]"
                onClick={() => {
                  if (tagText.length > 0){
                    const newArray = {
                      text: tagText,
                    };
                    setTagArray([...tagArray, newArray]);
                    settagText("");
                  } else {
                    setToastMessage(true)
                    setErrorMessage('Please type a tag')
                  }
                }}
              >
                <IoMdAdd color="#FF2424" />
                Add
              </div>
            </div>
            <div>
              <div className="flex mt-4 w-[100%] overflow-x-auto" id="tag-array">
                {tagArray.map((tag) => (
                  <div className="w-auto ps-4 pe-4 gap-2 h-[40px] rounded-[6px] me-1 bg-[#fdd6d6] text-[#FF2424] flex items-center justify-center">
                    {tag.text}
                    <IoMdClose
                      color="FF2424"
                      onClick={() => {
                        const newTagArray = tagArray.filter(
                          (tagg) => tagg !== tag
                        );
                        setTagArray(newTagArray);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="w-[100%] h-[60px] rounded-[10px] flex items-center gap-2 justify-center bg-[#FF2424] text-white hover:bg-[#DD0000]"
            onClick={handleAddFeed}
          >
            {buttonLoading ? (
              <SyncLoader color="#fff" size={10} />
            ) : (
              <div className="flex gap-4">
                <MdCampaign size={22} />
                <p>Publish Feed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateFeed;
