import React, { useRef, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { GrInstall } from "react-icons/gr";

const Navbar = () => {
   const { currentUser, logout } = useContext(AuthContext);
   const [scroll, setScroll] = useState(0);
   const scrollRef = useRef(null);
   const categoryRef = useRef(null); // New ref for category links

   useEffect(() => {
      const handleScroll = () => {
         setScroll(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   // Function to handle category link clicks
   const handleCategoryClick = () => {
      // You can adjust the desired scroll distance here (400 pixels in this case)
      window.scrollBy(0, 550);
   };

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
                  <h1>Kaleidoscope</h1>
               </Link>
            </div>
            <div className="links">
               {/* Add the onClick event handler for each category link */}
               <Link className="link" to="/" onClick={handleCategoryClick}>
                  All
               </Link>
               <Link
                  className="link"
                  to="/?cat=art"
                  onClick={handleCategoryClick}
               >
                  Art
               </Link>
               <Link
                  className="link"
                  to="/?cat=science"
                  onClick={handleCategoryClick}
               >
                  Science
               </Link>
               <Link
                  className="link"
                  to="/?cat=technology"
                  onClick={handleCategoryClick}
               >
                  Technology
               </Link>
               <Link
                  className="link"
                  to="/?cat=cinema"
                  onClick={handleCategoryClick}
               >
                  Cinema
               </Link>
               <Link
                  className="link"
                  to="/?cat=design"
                  onClick={handleCategoryClick}
               >
                  Design
               </Link>
               <Link
                  className="link"
                  to="/?cat=food"
                  onClick={handleCategoryClick}
               >
                  Food
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
