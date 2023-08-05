import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
   );

   const login = async (inputs) => {
      const res = await axios.post(
         process.env.REACT_APP_BASE_URL + "/api/auth/login",
         inputs,
         {
            withCredentials: true, // Send credentials (cookies) along with the request
         }
      );
      setCurrentUser(res.data);
   };

   const logout = async (inputs) => {
      await axios.post(
         process.env.REACT_APP_BASE_URL + "/api/auth/logout",
         null,

         {
            withCredentials: true, // Send credentials (cookies) along with the request
         }
      );
      setCurrentUser(null);
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
