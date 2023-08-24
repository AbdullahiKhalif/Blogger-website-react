import * as Yup from "yup";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBlgger from "../../Contexts/mainContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'

const Register = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState("password");
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const {state, dispatch } = useBlgger();

  const initialValue = {
    username: '',
    phone: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Please Enter Username"),
    phone: Yup.number().required("Please Enter Phone Number"),
    email: Yup.string().required("Please enter a valid email"),
    password: Yup.string().required("Please enter a valid password").matches(/[0-9]/,"number is required").matches(/[a-z]/,"small latter is required").matches(/[A-Z]/, "Capital letter is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    const { username, phone, email, password } = values;
    // addNewUser({ username, phone, email, password });
    let newElement = {};
    const isExist = state.users.find((user) => user.email === email);
    if (isExist) {
      toast.error("This user email is already exists.");
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
      resetForm();
      navigate('/login');
      
      
    }

    dispatch({
      type: "ADD_NEW_USER",
      payload: {
        users: newElement,
      },
    });
   // resetForm();
  };

//   useEffect(() => {
//     if (inputRef) {
//       inputRef.current.focus();
//     }
//   }, []);
  return (
    <div className="fixed h-full top-0 left-0 right-0 overflow-auto bg-[#F3F4F6]">
      <div className="flex justify-center items-center px-8 py-32 lg:p-48">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="" className="font-semibold ">
                  Username*
                </label>
                <Field
                  //   ref={inputRef}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="my-2 w-full p-2 text-[20] shadow rounded-md outline-none focus:border border-green-700"
                />
                <ErrorMessage className="text-red-500" name="username" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="font-semibold ">
                  Phone*
                </label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="my-2 w-full p-2 text-[20] shadow rounded-md outline-none focus:border border-green-700"
                />
                <ErrorMessage className="text-red-500" name="phone" component="div" />
              </div>

              <div className="form-group">
                <label htmlFor="" className="font-semibold ">
                  Email*
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="my-2 w-full p-2 text-[20] shadow rounded-md outline-none focus:border border-green-700"
                />
                <ErrorMessage className="text-red-500" name="email" component="div" />
              </div>

              <div className="relative form-group">
                <label htmlFor="" className="font-semibold ">
                  Password*
                </label>
                <Field
                  type={showPassword}
                  name="password"
                  placeholder="Enter your password"
                  className="my-2 w-full p-2 text-[20] shadow rounded-md outline-none focus:border border-green-700"
                />
                {showPassword == "password" ? <AiFillEye className="absolute top-10 right-5 cursor-pointer text-xl" onClick={() => setShowPassword("text")} /> : <AiFillEyeInvisible className="absolute top-10 right-5 cursor-pointer text-xl" onClick={() => setShowPassword("password")} /> }
                <ErrorMessage className="text-red-500" name="password" component="div" />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 text-center bg-[#065F46] text-white hover:bg-[#065f46f6]"
              >
                Register
              </button>
            </Form>
          </Formik>
          <div className="mt-4 text-center">
            <h2 className="">
              Already Registered ?{" "}
              <Link to="/login" className="text-green-600 font-bold">
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
