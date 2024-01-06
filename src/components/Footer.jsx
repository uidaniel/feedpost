import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black h-[200px] relative">
      <h1 className="text-white tracking-tighter text-[30px] font-bold ps-6 pt-4">
        FEEDPOST
      </h1>
      <div className="p-6 flex gap-4">
        <p
          className="text-white hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </p>
        <p
          className="text-white hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </p>
        <p
          className="text-white hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
          onClick={() => {
            navigate("/my-profile");
          }}
        >
          Profile
        </p>
        <p
          className="text-white hover:text-[#FF2424] duration-200 ease-in cursor-pointer"
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contact
        </p>
      </div>
      <div className="absolute bottom-0 border-t-2 w-[100%] pt-[15px] pb-[15px] text-center">
        <p className="text-white">
          Copyright © 2024 | <span className="text-[#FF2424]">Uwak Daniel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
