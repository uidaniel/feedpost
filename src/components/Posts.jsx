import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { Image, Shimmer } from "react-shimmer";
import {
  addEducationPost,
  addEntertainmentPost,
  addLifestylePost,
  addMusicPost,
  addPoliticsPost,
  addSportsPost,
  addTechnologyPost,
  updatePost,
  setPostContent,
  setPostDescription,
  setPostImage,
  setPostTitle,
  setPostCategory,
  setPostTags,
  setPostAuthor,
  setPostDate,
} from "../store/store";
import SyncLoader from "react-spinners/SyncLoader";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const navigate = useNavigate();

  // const posts = useSelector((state)=> state.posts) || []
  const fto = posts.slice(0, 3) || [];

  const latestPost = posts[0] || [];

  const politicsPost = posts.filter((post) => post.category == "Politics");
  const sportsPost = posts.filter((post) => post.category == "Sports");
  const musicPost = posts.filter((post) => post.category == "Music");
  const entertainmentPost = posts.filter(
    (post) => post.category == "Entertainment"
  );
  const lifestylePost = posts.filter((post) => post.category == "Lifestyle");
  const technologyPost = posts.filter((post) => post.category == "Technology");
  const educationPost = posts.filter((post) => post.category == "Education");

  dispatch(addPoliticsPost(politicsPost));
  dispatch(addSportsPost(sportsPost));
  dispatch(addMusicPost(musicPost));
  dispatch(addEntertainmentPost(entertainmentPost));
  dispatch(addLifestylePost(lifestylePost));
  dispatch(addTechnologyPost(technologyPost));
  dispatch(addEducationPost(educationPost));

  const randomPoliticsPost = politicsPost[0];

  const likes = useSelector((state) => state.likes);
  const comments = useSelector((state) => state.comments);
  const categoryShow = useSelector((state) => state.category);

  const theFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const newPosts = [];

      querySnapshot.forEach((doc) => {
        newPosts.unshift(doc.data());
      });

      dispatch(updatePost(newPosts));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await theFirebase();
      if (posts.length > 0) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [posts]);

  return (
    <div className=" bg-[#fcf7df]">
      {!isLoading && (
        <div className="flex items-center justify-center">
          {categoryShow == "POLITICS" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  POLITICS
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={randomPoliticsPost.postImage || ""}
                  alt={randomPoliticsPost.postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {randomPoliticsPost.postTitle}
                </p>
              </div>

              {politicsPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      POLITICS
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "SPORTS" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  SPORTS
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={sportsPost[0].postImage || ""}
                  alt={sportsPost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {sportsPost[0].postTitle}
                </p>
              </div>

              {sportsPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      SPORTS
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "MUSIC" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  MUSIC
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={musicPost[0].postImage || ""}
                  alt={musicPost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {musicPost[0].postTitle}
                </p>
              </div>

              {musicPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      MUSIC
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "ENTERTAINMENT" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  ENTERTAINMENT
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={entertainmentPost[0].postImage || ""}
                  alt={entertainmentPost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {entertainmentPost[0].postTitle}
                </p>
              </div>

              {entertainmentPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      ENTERTAINMENT
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "LIFESTYLE" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  LIFESTYLE
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={lifestylePost[0].postImage || ""}
                  alt={lifestylePost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {lifestylePost[0].postTitle}
                </p>
              </div>

              {lifestylePost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      LIFESTYLE
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "TECHNOLOGY" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  TECHNOLOGY
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={technologyPost[0].postImage || ""}
                  alt={technologyPost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {technologyPost[0].postTitle}
                </p>
              </div>

              {technologyPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      TECHNOLOGY
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "EDUCATION" && (
            <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df] p-4 w-[100%]">
              <div className="flex items-center justify-between">
                <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                  EDUCATION
                </p>
              </div>
              <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                <img
                  src={educationPost[0].postImage || ""}
                  alt={educationPost[0].postTitle}
                  className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                />
                <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                  {educationPost[0].postTitle}
                </p>
              </div>

              {educationPost.map((post) => (
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
                    <p className="text-[#FF2424] text-[20px] font-bold">
                      EDUCATION
                    </p>
                    <p className="font-bold w-[90%]">{post.postTitle}</p>
                    <p className="w-[100%]">
                      {post.postAuthor} - {post.postDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {categoryShow == "ALL" && (
            <section className="md:grid md:grid-rows-3 md:grid-cols-3 flex flex-col mt-7 pb-[20px] gap-[30px] md:gap-[80px] md:gap-y-[700px] md:px-12 px-4 h-[100vh] bg-[#fcf7df] md:">
              <div
                className="w-[100%] md:bg-black bg-black pb-[35px] rounded-[10px]"
                onClick={() => {
                  navigate(`/blog/${latestPost.category}/${latestPost.postId}`);
                }}
              >
                <div className="w-[100%] bg-red-100 h-[300px] rounded-t-[10px]">
                  <img
                    src={latestPost.postImage}
                    alt={latestPost.postTitle}
                    className="w-[100%] h-[100%] rounded-t-[10px] object-cover"
                  />
                </div>
                +
                <p className="text-white text-[26px] p-6 font-bold">
                  {latestPost.postTitle}
                </p>
                <p className="text-[#9e9e9e] px-6">
                  {latestPost.postDescription}
                </p>
                <p className="text-[#fff] px-6 mt-6">
                  By {latestPost.postAuthor}
                </p>
              </div>
              <div className="bg-[#fcf7df]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                    EDITOR'S PICKS
                  </p>
                  <p className="text-[#FF2424] font-bold">See more..</p>
                </div>
                <div className="md: md:h-[500px] md:overflow-y-auto">
                  {fto.map((obj) => (
                    <div
                      className="gap-6 flex flex-col mb-8"
                      onClick={() => {
                        dispatch(setPostImage(obj.postImage));
                        dispatch(setPostContent(obj.content));
                        dispatch(setPostTitle(obj.postTitle));
                        dispatch(setPostDescription(obj.PostDescription));
                        dispatch(setPostCategory(obj.category));
                        dispatch(setPostTags([obj.tags]));
                        dispatch(setPostAuthor(obj.postAuthor));
                        dispatch(setPostDate(obj.postDate));
                        navigate(`/blog/${obj.category}/${obj.postId}`);
                      }}
                    >
                      <img
                        src={obj.postImage}
                        className="h-[300px] w-[100%] rounded-[10px] object-cover"
                        alt=""
                      />
                      <p className="font-bold ps-2 text-[26px] w-[85%] hover:text-[#FF2424] duration-200 ease-in">
                        {obj.postTitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df]">
                <div className="flex items-center justify-between">
                  <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                    POLITICS
                  </p>
                  <p className="text-[#FF2424] font-bold">See more..</p>
                </div>
                <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                  <img
                    src={randomPoliticsPost.postImage || ""}
                    alt={randomPoliticsPost.postTitle}
                    className="w-full h-full object-cover rounded-[10px] opacity-40 absolute inset-0"
                  />
                  <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                    {randomPoliticsPost.postTitle}
                  </p>
                </div>

                {politicsPost.slice(0, 3).map((post) => (
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
                      <p className="text-[#FF2424] text-[20px] font-bold">
                        POLITICS
                      </p>
                      <p className="font-bold w-[90%]">{post.postTitle}</p>
                      <p className="w-[100%]">
                        {post.postAuthor} - {post.postDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df]">
                <div className="flex items-center justify-between">
                  <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                    SPORTS
                  </p>
                  <p className="text-[#FF2424] font-bold">See more..</p>
                </div>
                <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                  <img
                    src={sportsPost[0].postImage}
                    alt={sportsPost[0].postTitle}
                    className="w-full h-full object-cover rounded-[10px] opacity-50 absolute inset-0"
                  />
                  <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                    {sportsPost[0].postTitle}
                  </p>
                </div>

                {sportsPost.slice(0, 3).map((post) => (
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
                      <p className="text-[#FF2424] text-[20px] font-bold">
                        SPORTS
                      </p>
                      <p className="font-bold w-[90%]">{post.postTitle}</p>
                      <p className="w-[100%]">
                        {post.postAuthor} - {post.postDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gap-2 flex flex-col mb-8 bg-[#fcf7df]">
                <div className="flex items-center justify-between">
                  <p className="text-[36px] tracking-tighter text-[#000] font-bold">
                    MUSIC
                  </p>
                  <p className="text-[#FF2424] font-bold">See more..</p>
                </div>
                <div className="h-[300px] w-[100%] bg-black rounded-[10px] relative">
                  <img
                    src={musicPost[0].postImage}
                    alt={musicPost[0].postTitle}
                    className="w-full h-full object-cover rounded-[10px] opacity-50 absolute inset-0"
                  />
                  <p className="text-white text-[26px] p-6 mb-6 z-10 absolute bottom-0 left-0 right-0">
                    {musicPost[0].postTitle}
                  </p>
                </div>

                {musicPost.slice(0, 3).map((post) => (
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
                      <p className="text-[#FF2424] text-[20px] font-bold">
                        SPORTS
                      </p>
                      <p className="font-bold w-[90%]">{post.postTitle}</p>
                      <p className="w-[100%]">
                        {post.postAuthor} - {post.postDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {isLoading && (
        <div className="w-[100%] flex items-center justify-center h-[100vh]">
          <SyncLoader color="#FF2424" />
        </div>
      )}
    </div>
  );
};

export default Posts;
