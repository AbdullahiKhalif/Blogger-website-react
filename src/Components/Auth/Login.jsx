import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBlgger from "../../Contexts/mainContext";
import { toast } from "react-toastify";
const Login = () => {
  const [showPassword, setShowPassword] = useState("password");
  // const inputRef = useRef(null);
  const { state, dispatch } = useBlgger();
  const navigate = useNavigate();

  const validateYupSchema = Yup.object({
    email: Yup.string().required("Please enter a valid email"),
    password: Yup.string().required("Please enter password"),
  });

  const initialValue = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    dispatch({
      type: "LOGIN_USER",
      payload: { email, password },
    });

    if (!state.auth.authError) {
      // hadii uu authError message ah jirin
      navigate("/");
    } else {
      toast.error("Invalid Email or Password !.");
      // resetForm();
      return;
    }
    resetForm();
  };

  // useEffect(() => {
  //   if (inputRef) {
  //     inputRef.current.focus();
  //   }
  // }, []);
  return (
    <div className="fixed h-full  top-0 left-0 right-0 bg-[#F3F4F6]">
      <div className="flex justify-center items-center px-8 py-32 lg:p-48">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <Formik
            initialValues={initialValue}
            validationSchema={validateYupSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="" className="font-semibold ">
                  Email*
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="person@example.com"
                  className="my-2 w-full p-3 rounded-md text-[20] shadow outline-none focus:border border-green-700 [#F3F4F6]
focus:bg-[#F3F4F6]"
                />
                <ErrorMessage
                  name="email"
                  className="text-red-500"
                  component="div"
                />
              </div>

              <div className="relative form-group mt-2">
                <label htmlFor="" className="font-semibold ">
                  Password*
                </label>
                <Field
                  type={showPassword}
                  name="password"
                  className="my-2 w-full p-3 rounded-md text-[20] shadow outline-none focus:border border-green-700
focus:bg-[#F3F4F6]"
                />
                {showPassword === "password" ? <AiFillEye onClick={() => setShowPassword("")} className="absolute top-12 right-5 text-xl cursor-pointer"/>: <AiFillEyeInvisible onClick={() => setShowPassword("password")} className="absolute top-12 right-5 text-xl cursor-pointer"/>}
                <ErrorMessage
                  name="password"
                  className="text-red-500"
                  component="div"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 border-none mt-4 text-center bg-[#065F46] text-white hover:bg-[#065f46f6]"
              >
                Login
              </button>
            </Form>
          </Formik>
          <div className="mt-4 text-center">
            <h2 className="">
              I don't have account |{" "}
              <Link to="/register" className="text-green-600 font-bold">
                Register
              </Link>
            </h2>
            <Link to="/forget-password" className="text-green-600">
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
