import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
   );

   const login = async (inputs) => {
      try {
         const config = {
            method: "POST",
            mode: "no-cors", // Set the mode to 'no-cors'
            headers: {
               "Content-Type": "application/json",
            },
            withCredentials: true, // Send credentials (cookies) along with the request
         };

         const url = `${process.env.REACT_APP_BASE_URL}/api/auth/login`;
         await axios(url, inputs, config);
         setCurrentUser("Login successful");
      } catch (err) {
         console.log(err);
         setCurrentUser(null);
      }
   };

   const logout = async (inputs) => {
      try {
         const config = {
            method: "POST",
            mode: "no-cors", // Set the mode to 'no-cors'
            headers: {
               "Content-Type": "application/json",
            },
            withCredentials: true, // Send credentials (cookies) along with the request
         };

         const url = `${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
         await axios(url, null, config);
         setCurrentUser(null); // Assuming logout was successful since we can't access the response data.
      } catch (err) {
         console.log(err);
         setCurrentUser(null);
      }
   };

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
   }, [currentUser]);

   return (
      <AuthContext.Provider value={{ currentUser, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
