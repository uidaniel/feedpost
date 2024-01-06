import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import SyncLoader from "react-spinners/SyncLoader";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async () => {
    setButtonLoading(true);
    if (name && subject && message) {
      try {
        await addDoc(collection(firestore, "enquiries"), {
          name: name,
          subject: subject,
          message: message,
        });
        setButtonLoading(false);
        setToastSuccessMessage(true);
        setSuccessMessage(
          "Your information has been sent, check updates on your email"
        );
        setTimeout(() => {
          setToastSuccessMessage(false);
        }, 3000);
        setName("");
        setSubject("");
        setMessage("");
      } catch (e) {
        setErrorMessage(e.message);
        setButtonLoading(false);
        setToastMessage(true);
        setTimeout(() => {
          setToastMessage(false);
        }, 3000);
      }
    } else {
      setButtonLoading(false);
      setErrorMessage("Please input the required details");
      setToastMessage(true);
      setTimeout(() => {
        setToastMessage(false);
      }, 3000);
    }
  };

  return (
    <section>
      {toastSuccessMessage && (
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          className="fixed top-4 left-[10vw] z-[10] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between"
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
          className="fixed top-4 left-[10vw] z-[10] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between"
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
      <Navbar></Navbar>
      <div>
        <p className="text-center text-[40px] mt-10 font-bold text-[#FF2424] underline">
          CONTACT FORM
        </p>
        <div className="p-4 pb-0">
          <div className="mt-3 mb-5">
            <label htmlFor="Post Title">
              Full Name<span className="text-[#FF2424]">*</span>
            </label>
            <input
              type="text"
              className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="mt-3">
            <label htmlFor="Post Title">
              Subject<span className="text-[#FF2424]">*</span>
            </label>
            <input
              type="text"
              className="border rounded-[10px] block h-[50px] w-[100%] mt-1 ps-4"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="mt-3 mb-5">
            <label htmlFor="Post Title">
              Message<span className="text-[#FF2424]">*</span>
            </label>
            <textarea
              type="text"
              className="border rounded-[10px] block h-[300px] w-[100%] mt-1 ps-4 pt-4"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-4">
          <div
            className="w-[100%] h-[60px] rounded-[10px] flex items-center gap-2 justify-center bg-[#FF2424] text-white hover:bg-[#DD0000]"
            onClick={handleSubmit}
          >
            {buttonLoading ? (
              <SyncLoader color="#fff" size={10} />
            ) : (
              <div className="flex gap-4">
                <p>Submit</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default Contact;
