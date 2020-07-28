import React, {createContext, useReducer } from "react";
import BlogReducer from './BlogReducer'

const BlogContext = createContext();
const BlogContextProvider = (props) => {

    // declare initial state here
const initialState={
    blogPosts:[],
    currentBlogPost: null,
    loading: true
}
// useReducer takes two params>> a reducer function and initiaLstate
// state and dispatch function are destructured 
// the blogReducer will be listening to dispatch and updating state according to dispatch action 
const [state,dispatch] = useReducer(BlogReducer, initialState)

// Actions

    // get post from api
    const getPosts = async()=>{
        try{
        // make request to api
          dispatch({type:'SENDING_REQUEST'});
          const res = await fetch('/posts') 
          const data = await res.json()
        // request completed successfully 

        dispatch({type:'REQUEST_FINISHED'});
        dispatch({type:'SET_POSTS', payload:data});
        }catch(err){
            console.log(err)
        }
    }

    // get a single post
    const getPostById = async(postId)=>{
       
        try{
        // make request to api
          dispatch({type:'SENDING_REQUEST'});
          const res = await fetch(`/posts/${postId}`) 
          const data = await res.json()
        // request completed successfully 

        dispatch({type:'REQUEST_FINISHED'});
        dispatch({type:'SET_POST', payload:data});
        }catch(err){
            console.log(err)
        }
    }

  return (
    <BlogContext.Provider
      value={{
        getPosts,
        blogPosts: state.blogPosts,
        currentBlogPost: state.currentBlogPost,
        loading: state.loading,
        getPostById:getPostById
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

const BlogConsumer = BlogContext.Consumer;
export { BlogContextProvider, BlogConsumer, BlogContext };
