import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useBlgger from "../Contexts/mainContext";

const Header = () => {
  const { state, dispatch } = useBlgger();
  const navigte = useNavigate();
  const handleLogout = () =>{
    dispatch({
      type: "LOGOUT"
    });
    navigte("/")
  }
  return (
    <div className="fixed p-4 bg-white z-10  backdrop-blur shadow-lg top-0 left-0 right-0">
      <div className="max-w-6xl m-auto">
        <div className="flex justify-between items-center space-x-3">
          <Link to="/" className="text-xl font-bold">
            <img src="/logo.png" className="w-36" alt="Logo" />
          </Link>

          <ul className="flex justify-between items-center gap-2 lg:gap-10 ">
            <Link to="/posts">Posts</Link>
            <Link to="/new">New</Link>
          </ul>
          {state.auth.isAuthenticated ? (
            <Link
    
              onClick={handleLogout}
              className="flex justify-end gap-5 text-2xl items-center bg-[#6EE7B7] rounded-full text-center text-green-900 font-bold"
            >
              <h2 className="flex justify-center items-center w-12 h-12">
                {state.auth.currentUser.username[0]}
              </h2>
            </Link>
          ) : (
            <div className="flex justify-end gap-5 items-center">
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="py-2 px-2 w-24 text-center bg-gray-500 text-white rounded-lg hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
