import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useNavigate} from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
  return (
    <section>
      <Navbar />
      <div className="text-center text-[40px] mt-10 font-bold text-[#FF2424] underline">
        ABOUT FEEDPOST
      </div>
      <p className="text-center p-5">
        Welcome to FeedPost! At FeedPost, we are passionate about creating a
        seamless and engaging platform for users to connect, share, and
        discover. Our platform was born out of the belief that sharing
        meaningful stories and experiences can foster a sense of community and
        connection. Our Mission FeedPost is on a mission to empower individuals
        to share their stories, connect with like-minded people, and build a
        diverse and supportive online community. We aim to redefine the way
        people interact with content, making it easy and enjoyable to express
        yourself and discover captivating posts from others. What Sets Us Apart
        Captivating Feeds FeedPost provides dynamic and personalized feeds,
        ensuring that every user's experience is tailored to their interests.
        Our smart algorithms analyze user preferences, delivering content that
        matters most to you. Seamless Sharing With an intuitive and
        user-friendly interface, FeedPost makes sharing your thoughts, photos,
        and experiences a breeze. Express yourself with ease and connect with
        others who resonate with your content. Community Engagement FeedPost is
        more than just a platform; it's a community. Engage in meaningful
        conversations, discover new perspectives, and support fellow
        FeedPosters. We believe in fostering a positive and inclusive
        environment for everyone. Contact Us Have questions, feedback, or just
        want to say hello? We'd love to hear from you! Reach out to us at
        dannycodesltd@gmail.com or use our{" "}
        <span className="text-[#FF2424] font-bold cursor-pointer" onClick={()=> {
            navigate('/contact')
        }}>
          Contact Form
        </span>
        . Thank you for being a part of the FeedPost community. Together, let's
        create, share, and connect! FeedPost Team
      </p>
      <Footer></Footer>
    </section>
  );
};

export default About;
