import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDocs, collection, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const profilepic = useSelector((state) => state.profilePicture);
  const userName = useSelector((state) => state.userName);
  const email = useSelector((state) => state.userEmail);
  const [feedCount, setFeedCount] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [emptyFeed, setEmptyFeed] = useState(false);

  useEffect(() => {
    const theFirebase = async () => {
      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const likesQuerySnapshot = await getDocs(
        collection(firestore, "LikeCount")
      );
      const userQuerySnapshot = await getDocs(collection(firestore, "users"));
      const userFeeds = [];
      const userLikes = [];
      const userDetails = [];
      querySnapshot.forEach((doc) => {
        userFeeds.push(doc.data());
      });
      likesQuerySnapshot.forEach((doc) => {
        userLikes.push(doc.data());
      });

      const currentUserFeeds = userFeeds.filter(
        (feed) => feed.postAuthor == userName
      );
      const currentUserLikes = userLikes.filter(
        (like) => like.userName == userName
      );
      setFeedCount(currentUserFeeds.length);
      setFeeds(currentUserFeeds);
      setLikes(currentUserLikes.length);
      if (currentUserFeeds.length == 0) {
        setEmptyFeed(true);
      }
    };
    theFirebase();
    if (userName == "") {
      navigate("/signin");
    }
  }, []);
  return (
    <section>
      <div className="bg-black/90 h-[180px] relative">
        <div className="header flex items-center gap-3 justify-between p-4 z-10">
          <div className="flex gap-3">
            <IoIosArrowRoundBack
              color="white"
              size={50}
              onClick={() => {
                navigate(-1);
              }}
            />
            <p className="text-white text-[30px]">My Profile</p>
          </div>
          <Link
            to="/edit-profile"
            className="w-[80px] rounded-full h-[35px] flex justify-center items-center bg-white decoration-none"
          >
            Edit
          </Link>
        </div>
        <div className="w-[130px] h-[130px] rounded-full border ms-6 relative top-8 bg-white">
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
      </div>
      <div className="flex justify-between h-[160px] border-b">
        <div className="ms-6 relative top-20">
          <p className="text-[24px] font-bold">{userName}</p>
          <p className="text-[#575757] text-[14px]">{email}</p>
        </div>
        <div className="flex mt-5">
          <div className="text-center border-r ps-8 pe-8 h-[75px]">
            <p>Feeds</p>
            <p className="text-[25px] font-bold">{feedCount}</p>
          </div>
          <div className="text-center border-r ps-8 pe-8 h-[75px]">
            <p>Likes</p>
            <p className="text-[25px] font-bold">{likes}</p>
          </div>
        </div>
      </div>
      <div className="ps-6">
        <p className="text-[#FF2424] text-[30px] font-bold mt-6">FEEDS</p>
      </div>
      <div className="p-4">
        {emptyFeed && (
          <div className="text-[25px]">
            You have no existing feed
            <div
              className="mt-4 rounded-full bg-[#FF2424] h-[45px] flex justify-center items-center text-[16px] text-white"
              onClick={() => {
                navigate("/createfeed");
              }}
            >
              Create new feed
            </div>
          </div>
        )}
        {feeds.map((post) => (
          <div
            className="flex gap-4 items-center mt-4 mb-6"
            onClick={() => {
              navigate(`/blog/${post.category}/${post.postId}`);
            }}
          >
            <div className="w-[auto] h-[auto] rounded-[10px] bg-red-100">
              <img
                src={post.postImage}
                alt={post.postTitle}
                className="max-w-[150px] max-h-[150px] rounded-[10px]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#FF2424] text-[20px] font-bold">POLITICS</p>
              <p className="font-bold w-[90%]">{post.postTitle}</p>
              <p className="w-[100%]">
                {post.postAuthor} - {post.postDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyProfile;
