import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import Posts from "./Components/posts/Posts.jsx";
import CreatePost from "./Components/posts/CreatePost.jsx";
import { MainProvider } from "./Contexts/mainContext.jsx";

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/new",
        element: <CreatePost />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forget-password",
        element: <h1>Forget password</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={routerProvider} />
    </MainProvider>
  </React.StrictMode>
);
