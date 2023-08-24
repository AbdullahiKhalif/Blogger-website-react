import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, mainReducer } from "../Reducers/mainReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const MainContext = createContext();


export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  

  useEffect(() => {
    localStorage.setItem(
      "bloger_ldb",
      JSON.stringify({
        users: state.users,
        posts: state.posts,
        comments: state.comments,
        auth: state.auth,
      })
    );
  }, [state]);

  const addNewUser = ({ username, phone, email, password }) => {
    let newElement = {};
    const isExist = state.users.find((user) => user.email === email);
    if (isExist) {
      toast.error("Sory! this useris already exists.");
      return;
    } else {
      newElement = {
        user_id: new Date().getTime(),
        username: username,
        phone: phone,
        email: email,
        password: password,
      };
      toast.success("Successfully Registered");
 
        username= ""
        phone= ""
        email = ""
        password = ""
      
    }

    dispatch({
      type: "ADD_NEW_USER",
      payload: {
        users: newElement,
      },
    });
  };

  const loginUser = ({ email, password }) => {
   //const navigate = useNavigate();
    dispatch({
      type: "LOGIN_USER",
      payload:{
      email,password  
      }
    });

    if(!state.auth.authError){
    // navigate("/")
    toast.error("Success.");
    }else{
      toast.error("Incorret email or password.");
    }
  };

  const value = {
    // users: state.users,
    // loginUser,
    // addNewUser,
    state, dispatch
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useBlgger = () => {
  const context = useContext(MainContext);
  return context;
};
export default useBlgger;
