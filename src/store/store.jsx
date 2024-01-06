import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase';

const initialState = {
  posts: [
    
  ],
  interactions: [],
  politicsPost: [],
  sportsPost: [],
  musicPost: [],
  lifestylePost: [],
  entertainmentPost: [],
  technologyPost: [],
  educationPost: [],
  profilePicture: '',
  userEmail: '',
  userName: '',
  userId: '',
  postTitle: '',
  postDescription: '',
  postContent: '',
  postImage: '',
  postCategory: '',
  postTags: [],
  postDate: '',
  postAuthor: '',
  category: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      const postID = state.posts.length
      const {postId, post} = action.payload
      state.posts.push({postId: postID, ...post, likes: 0, comments: 0})

      const user = auth.currentUser
    },
    updatePost: (state, action) => {
      state.posts = action.payload
    },

    addPoliticsPost: (state,action)=> {
      state.politicsPost = action.payload
    },
    
    addSportsPost: (state, action)=> {
      state.sportsPost = action.payload
    },

    addMusicPost: (state,action)=> {
      state.musicPost = action.payload
    },

    addLifestylePost: (state, action)=> {
      state.lifestylePost = action.payload
    },

    addEntertainmentPost: (state, action)=> {
      state.entertainmentPost = action.payload
    },

    addTechnologyPost: (state, action)=> {
      state.technologyPost = action.payload
    },

    addEducationPost: (state, action)=> {
      state.educationPost = action.payload
    },

    userProfilePicture: (state,action)=> {
      state.profilePicture = action.payload
    },

    userEmail: (state, action)=> {
      state.userEmail = action.payload
    },

    usersName: (state, action) => {
      state.userName = action.payload
    },

    setPostTitle: (state, action)=> {
      state.postTitle = action.payload
    },

    setPostDescription: (state, action)=> {
      state.postDescription = action.payload
    },

    setPostContent: (state, action)=> {
      state.postContent = action.payload
    },

    setPostImage: (state, action)=> {
      state.postImage = action.payload
    }, 

    setPostCategory: (state, action)=> {
      state.postCategory = action.payload
    },

    setPostTags: (state, action)=> {
      state.postTags = action.payload
    },

    setUserId: (state, action)=> {
      state.userId = action.payload
    },

    setPostAuthor: (state, action)=> {
      state.postAuthor = action.payload
    },

    setPostDate: (state, action)=> {
      state.postDate = action.payload
    },

    addLike: (state, action)=> {
      state.interactions.push(action.payload)
    },

    addCategory: (state, action)=> {
      state.category = action.payload
    }
    
  },
});

const rootReducer = postSlice.reducer;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const {addNewPost, updatePost, addPoliticsPost, addTechnologyPost, addEntertainmentPost, addEducationPost, addMusicPost, addLifestylePost, addSportsPost, userEmail, userProfilePicture, usersName, setPostContent, setPostDescription, setPostImage, setPostTitle, setPostCategory, setPostTags, setUserId, setPostAuthor, setPostDate, addCategory} = postSlice.actions