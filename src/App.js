import React from "react";
import {
   createBrowserRouter,
   RouterProvider,
   Route,
   Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whattodo from "./pages/Whattodo";
// css
import "./style.scss";

const Layout = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/post/:id",
            element: <Single />,
         },
         {
            path: "/write",
            element: <Write />,
         },
         {
            path: "/profile",
            element: <Profile />,
         },
      ],
   },
   {
      path: "/register",
      element: (
         <div>
            <Register />
         </div>
      ),
   },
   {
      path: "/login",
      element: (
         <div>
            <Login />
         </div>
      ),
   },
]);

const App = () => {
   return (
      <div className="app">
         <div className="container">
            <Whattodo />
            <RouterProvider router={router} />
         </div>
      </div>
   );
};

export default App;
