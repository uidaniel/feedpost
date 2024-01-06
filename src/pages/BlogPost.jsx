import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Fa1, FaArrowLeftLong, FaThumbsUp, FaComment } from "react-icons/fa6";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { IoSend } from "react-icons/io5";
import SyncLoader from "react-spinners/SyncLoader";

//post author and post description
import { useParams, useNavigate } from "react-router-dom";

const BlogPost = () => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [likeArray, setLikeArray] = useState([]);
  const [postiveLike, setPositiveLike] = useState(false);

  const fetchComment = async () => {
    try {
      const fetchedComments = await getDocs(
        collection(firestore, "interactions")
      );
      const fetchLike = await getDocs(collection(firestore, "LikeCount"));
      let theComments = [];
      let theLikes = [];
      fetchLike.forEach((doc) => {
        theLikes.unshift({ docId: doc.id, ...doc.data() });
      });
      fetchedComments.forEach((doc) => {
        theComments.unshift(doc.data());
      });
      const postComments = theComments.filter(
        (theComment) => theComment.postId == postId
      );
      setComments(postComments);
      console.log(postComments);
      setCommentCount(postComments.length);
      console.log(theLikes);
      const pLikeCount = theLikes.filter((l) => l.postId == postId);
      setLikeArray(pLikeCount);
      console.log(pLikeCount);
      setLikeCount(pLikeCount.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handlePostComment = async () => {
    if (userName) {
      const newComment = {
        postId: postId,
        commentValue: commentInput,
        userName: userName,
        profilePicture: profilePicture,
      };

      try {
        await addDoc(collection(firestore, "interactions"), newComment);
        setComments((prevComments) => [newComment, ...prevComments]);
        setCommentInput("");
        setCommentCount(commentCount + 1);
        await addDoc(collection(firestore, "CommentCount"), newComment);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/signin");
    }
  };

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");

  const userName = useSelector((state) => state.userName);
  const profilePicture = useSelector((state) => state.profilePicture);
  const theFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const newPosts = [];

      querySnapshot.forEach((doc) => {
        newPosts.push(doc.data());
      });

      setPosts(newPosts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    theFirebase();
    setCommentCount(comments.length);
  }, []);

  const { postId } = useParams();
  const navigate = useNavigate();

  const existingPost = posts.filter((post) => post.postId == postId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (existingPost) {
        setIsLoading(false);
      }
    }, 2000);
  }, []);

  const handleAddLike = async () => {
    const existingLike = likeArray.find((like) => like.userName === userName);

    if (existingLike) {
      const likeDocRef = doc(firestore, "LikeCount", existingLike.docId);
      await deleteDoc(likeDocRef);
    } else {
      const newLike = {
        postId: postId,
        userName: userName,
        likeCount: 1,
      };

      try {
        await addDoc(collection(firestore, "LikeCount"), newLike);
      } catch (err) {
        console.log(err);
      }
    }

    // Refetch the like count after updating likes
    try {
      const updatedLikes = await getDocs(collection(firestore, "LikeCount"));
      const updatedLikeArray = [];
      updatedLikes.forEach((doc) => {
        updatedLikeArray.unshift({ docId: doc.id, ...doc.data() });
      });
      const updatedPostLikes = updatedLikeArray.filter(
        (l) => l.postId === postId
      );
      setLikeArray(updatedPostLikes);
      setLikeCount(updatedPostLikes.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-[100vh]">
      <Navbar />
      {isLoading && (
        <div className="w-[100%] flex items-center justify-center h-[100%]">
          <SyncLoader color="#FF2424" />
        </div>
      )}
      {!isLoading && (
        <div>
          {existingPost.map((post) => (
            <section className="flex flex-col gap-4 text-left p-10 ps-6">
              <FaArrowLeftLong
                size={30}
                onClick={() => {
                  navigate(-1);
                }}
              />
              <p className="font-bold uppercase text-[20px] text-[#FF2424]">
                {post.category}
              </p>
              <p className="font-bold text-[38px] tracking-tighter">
                {post.postTitle}
              </p>
              <p>{post.postDescription}</p>
              <p className="text-[14px] text-[#666666]">
                {post.postAuthor} - {post.postDate}
              </p>
              <div className="flex gap-6">
                <div
                  className={
                    postiveLike
                      ? "flex gap-2 items-center font-bold text-[#FF2424]"
                      : "flex gap-2 items-center font-bold"
                  }
                  onClick={handleAddLike}
                >
                  <FaThumbsUp size={26} />
                  {likeCount}
                  {/* <FaComment size={26}/> */}
                </div>
                <div className="flex gap-2 items-center font-bold">
                  <FaComment size={26} />
                  {commentCount}
                </div>
              </div>
              <img
                src={post.postImage}
                alt=""
                className="w-[100%] h-[280px] bg-red-300 rounded-[10px] object-cover"
              />
              <p>{post.content}</p>
              <hr />
              <div>
                <p className="text-[26px] font-bold">COMMENTS</p>
                <div className="h-[250px] overflow-y-auto">
                  {comments && (
                    <div>
                      {comments.map((comment) => (
                        <div className="flex gap-4 mt-6">
                          <img
                            src={comment.profilePicture}
                            alt=""
                            className="rounded-[10px] w-[60px] h-[60px] bg-red-600 min-w-[60px] min-h[60px]"
                          />
                          <div>
                            <p>{comment.userName}</p>
                            <p className="text-[14px] text-[#666666]">
                              {comment.commentValue}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {comments.length === 0 && (
                    <div>
                      No comments yet under this post. Be the first to comment!
                      😁
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <label htmlFor="Write Comment">Write Comment</label>
                  <div className="h-[55px] w-[100%] mt-2 border bg-white flex items-center">
                    <input
                      type="text"
                      className="block h-[100%] w-[100%] ps-4 outline-none focus:outline-none"
                      value={commentInput}
                      placeholder="Write your comment here.."
                      onChange={(e) => {
                        setCommentInput(e.target.value);
                      }}
                    />
                    {commentInput && (
                      <div
                        className="h-[45px] w-[45px] bg-[#FF2424] rounded-[6px] flex justify-center items-center hover:bg-[#DD0000]"
                        onClick={handlePostComment}
                      >
                        <IoSend color="white" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

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
    </section>
  );
};

export default BlogPost;
