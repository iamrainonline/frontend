import { React, useRef, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { GrInstall } from "react-icons/gr";

const Navbar = () => {
   const { currentUser, logout } = useContext(AuthContext);
   const [scroll, setScroll] = useState(0);
   const scrollRef = useRef(null);

   useEffect(() => {
      const handleScroll = () => {
         setScroll(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <div
         className={scroll >= 60 ? "newnavbar navbar" : "navbar"}
         ref={scrollRef}
      >
         <div className="container">
            <div className="logo">
               <Link
                  to="/"
                  style={{
                     display: "flex",
                     color: "black",
                     textDecoration: "none",
                     fontSize: "px",
                     alignItems: "center",
                     gap: "10px",
                  }}
               >
                  <GrInstall size="55" color="#333" />
                  <h1>Boxi's Blog</h1>
               </Link>
            </div>
            <div className="links">
               <Link className="link" to="/">
                  <h6>All</h6>
               </Link>
               <Link className="link" to="/?cat=art">
                  <h6>Art</h6>
               </Link>
               <Link className="link" to="/?cat=science">
                  <h6>Science</h6>
               </Link>
               <Link className="link" to="/?cat=technology">
                  <h6>Technology</h6>
               </Link>
               <Link className="link" to="/?cat=cinema">
                  <h6>Cinema</h6>
               </Link>
               <Link className="link" to="/?cat=design">
                  <h6>Design</h6>
               </Link>
               <Link className="link" to="/?cat=food">
                  <h6>Food</h6>
               </Link>
               <div className="loginName">
                  {currentUser && currentUser.username ? (
                     <Link className="link profilename" to="/profile">
                        <span>{currentUser?.username}</span>
                     </Link>
                  ) : (
                     ""
                  )}

                  {currentUser ? (
                     <Link className="link logooutbutton" to="/">
                        <span onClick={logout}>Logout</span>
                     </Link>
                  ) : (
                     <Link className="link" to="/login">
                        Login
                     </Link>
                  )}
               </div>

               {currentUser ? (
                  <Link className="link" to="/write">
                     <span className="write">Write</span>
                  </Link>
               ) : (
                  <p></p>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
