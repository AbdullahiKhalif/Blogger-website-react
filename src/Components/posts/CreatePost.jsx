import React, { useEffect, useRef, useState } from "react";
import useBlgger from "../../Contexts/mainContext";
import { useNavigate } from "react-router-dom";
import Protected from "../Auth/Protected";
import { toast } from "react-toastify";

const CreatePost = () => {
  const imageRef = useRef(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const { state, dispatch } = useBlgger();
  console.log(state.posts);
  const navigate = useNavigate();
  const clearForm = () => {
    setPostTitle("");
    setPostContent("");
    setPostImage(null);
    imageRef.current.value = "";
  };
  const handleSumbit = (event) => {
    var newPost ={};
    event.preventDefault();
    if (postTitle.trim() == "") {
      toast.error("You must specify a title");
      return;
    } else if (postContent.trim() == "") {
      toast.error("You must specify a content");
      return;
    } else {
      const currentDate = new Date();
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);

       newPost = {
        post_id: new Date(),
        postTitle: postTitle,
        postContent: postContent,
        postImage: postImage,
        author: state.auth.currentUser.username,
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        date: formattedDate,
      };

      toast.success("Successfully added post");
      clearForm();
    }
    dispatch({
      type: "ADD_NEW_POST",
      payload: { 
        posts: newPost
       },
    });
  };

  return (
    <Protected>
      <div className="fixed top-1 h-full left-0 right-0 bg-[#E1E2E4] overflow-auto">
        <div className="mt-24 p-4 ">
          <div className="max-w-2xl m-auto p-8  bg-white shadow-lg rounded-lg">
            <div className="py-2">
              <h2 className="text-xl font-semibold text-gray-600">
                Create your post here.
              </h2>
              <hr className="mt-2 border border-gray-200 mb-4" />
              <form onSubmit={handleSumbit}>
                <div className="form-group">
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter Your Title"
                    className="p-2 mt-2 text-md w-full bg-gray-100 rounded-md shadow-md outline-none focus:border border-green-800"
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    // type="text"
                    rows="8"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write your post content"
                    className="p-2 mt-2 text-md w-full  bg-gray-100 rounded-md shadow-md outline-none focus:border border-green-800"
                  ></textarea>
                </div>

                <div className="form-group">
                  <input
                    type="file"
                    ref={imageRef}
                    // value={postImage}
                    onChange={(e) => setPostImage(e.target.files[0])}
                    // placeholder="Enter Your Title"
                    className="p-2 mt-2 text-md w-full bg-gray-100 rounded-md shadow-md outline-none focus:border border-green-800"
                  />

                  {postImage && (
                    <div className="text-center my-4">
                      <img
                        src={URL.createObjectURL(postImage)}
                        alt="Post Image"
                        className="w-full h-full rounded-md object-cover border border-green-800 shadow"
                      />
                    </div>
                  )}
                  <div className="flex justify-end items-end pt-6">
                    <button
                      type="submit"
                      className="text-center px-3 w-24 py-2 rounded-lg bg-green-900 text-white focus:border-none"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default CreatePost;
