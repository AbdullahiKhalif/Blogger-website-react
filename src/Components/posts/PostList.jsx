import React from "react";
import useBlgger from "../../Contexts/mainContext";
import { Link } from "react-router-dom";

const PostList = () => {
  const { state, dispatch } = useBlgger();
  return (
    <div className="max-w-2xl m-auto ">
      <h2 className="text-lg p-2 mt-4 font-semibold text-gray-500">
        Recent Post
      </h2>

      {state.posts.map((post) => (
        <div className="mb-5 m-1">
          <div className="p-4 shadow-lg bg-gray-50 rounded-lg w-full h-auto">
            <div className="flex flex-col">
              <div className="flex ">
                <span className="flex justify-end gap-5 text-2xl items-center bg-[#6EE7B7] rounded-full text-center text-green-900 font-bold">
                  <h2 className="flex justify-center items-center w-12 h-12">
                    {post.author[0]}
                  </h2>
                </span>
                <div className="flex flex-col ml-1 items-start">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {post.author}
                  </h2>
                  <div className="flex -mt-[5px]">
                    <p className="text-light text-[12px]">{post.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-1 mt-1">
                <h2 className="text-xl font-bold ">{post.postTitle}</h2>
                <p className="trankate">{post.postContent}</p>
                {post.postImage ? (
                  <div className="w-full h-64 rounded mt-2 bg-gradient-to-r from-gray-400 to-gray-700">
                    {/* <img
                    src={URL.createObjectURL(post.postImage)}
                    alt="Image"
                    className="w-full h-auto object-cover rounded-md border border-green-400"
                  /> */}
                  </div>
                ) : (
                  //   <div className="w-full h-64 rounded bg-gradient-to-r from-gray-200 to-gray-600">
                  //     {/* <img
                  //       src={URL.createObjectURL(post.postImage)}
                  //       alt="Image"
                  //       className="w-full h-auto object-cover rounded-md border border-green-400"
                  //     /> */}
                  //   </div>
                  <h3>No Image</h3>
                )}
                {state.auth.isAuthenticated &&
                  state.auth.currentUser.username == post.author && (
                    <div className="flex items-center space-x-2 mt-2 text-center justify-end">
                      <Link className="px-2 py-3 bg-indigo-600 text-white rounded-md w-24">
                        Upadte
                      </Link>
                      <Link className="px-2 py-3 bg-red-800 text-white rounded-md w-24">
                        Delete
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
