import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { firestore } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const Search = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [emptySearch, setEmptySearch] = useState(true);
  const [noResults, setNoResults] = useState(false)

  // const posts = useSelector((state)=> state.posts)
  const [posts, setPosts] = useState([]);

  const handleSearchPost = () => {
    const searchParam = posts.filter((post) =>
      post.postTitle.toLowerCase().includes(searchValue)
    );
    console.log(searchParam)
    if (searchParam.length === 0){
      setNoResults(true)
      setSearch(false)
    } else {
      setSearchResults(searchParam);
      // alert(searchParam);
      setSearch(true);
      setEmptySearch(false);
    }
    
  };

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
    window.scrollTo(0, 0);
    theFirebase();
  }, []);

  return (
    <section className="p-0 m-0">
      <Navbar />
      <div
        className="p-4 ps-6"
      >
        <IoIosArrowRoundBack size={50} onClick={() => {
          navigate(-1);
        }}/>
      </div>
      <div className="w-[100%] p-5 pt-0">
        <div className="h-[60px] flex items-center justify-between gap-4">
          <input
            type="text"
            className="h-[60px] w-[100%] border ps-5"
            placeholder="Search here..."
            value={searchValue}
            onClick={() => {
              setSearch(false);
              setNoResults(false)
              setSearchResults([])
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div
            className="min-h-[60px] min-w-[60px] flex items-center justify-center text-white bg-[#FF2424] rounded-[6px]"
            onClick={handleSearchPost}
          >
            <IoSearchOutline size={26} />
          </div>
        </div>
      </div>
      {search && (
        <div className="h-[50px] w-[100%] bg-black text-white text-[25px] flex items-center justify-center font-bold">
          Results for "{searchValue}"
        </div>
      )}

        {noResults && (
          <div className="h-[50px] w-[100%] bg-black text-white text-[25px] flex items-center justify-center font-bold">
          No Results for "{searchValue}"
        </div>
        )}

      <div className="p-4">
        {emptySearch && (
          <div className="flex items-center justify-center h-[100%] text-[30px]">
            Search for something!
          </div>
        )}
          <div>
            {posts.map((post) => (
          <div
            className="flex gap-4 items-center mt-4 mb-6 border-b pb-6 border-[#cccccc]"
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
                {post.category}
              </p>
              <p className="font-bold w-[90%]">{post.postTitle}</p>
              <p className="w-[100%]">
                {post.postAuthor} - {post.postDate}
              </p>
            </div>
          </div>
        ))}
          </div>
        
      </div>
    </section>
  );
};

export default Search;
