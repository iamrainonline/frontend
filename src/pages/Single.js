import { React, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import Menu from "../components/Menu";
import moment from "moment";
import axios from "axios";
import "../context/authContext";
import { AuthContext } from "../context/authContext";

const Single = () => {
   const [post, setPost] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   const location = useLocation();
   const navigate = useNavigate();

   const postId = location.pathname.split("/")[2];

   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const config = {
               method: "GET",
               mode: "no-cors", // Set the mode to 'no-cors'
               headers: {
                  "Content-Type": "application/json",
               },
               withCredentials: true,
            };

            const url = `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`;
            const res = await axios(url, config);
            setPost(res.data);
            setIsLoading(false);
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [postId]);

   const handleDelete = async () => {
      try {
         const config = {
            method: "DELETE",
            mode: "no-cors", // Set the mode to 'no-cors'
            headers: {
               "Content-Type": "application/json",
            },
            withCredentials: true,
         };

         const url = `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`;
         await axios(url, config);
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };

   if (isLoading) {
      return <div>Loading...</div>; // Render a loading indicator while data is being fetched
   }

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
   };

   return (
      <div className="single">
         <div className="content">
            <img src={`${post[0]?.img}`} alt="" className="imgtest" />
            <div className="user">
               {currentUser.img && <img src={currentUser.img} alt="" />}
               <div className="info">
                  <span>{post[0].username}</span>
                  <p>Posted {moment(post[0].date).fromNow()}</p>
               </div>

               {currentUser && currentUser.username === post[0]?.username && (
                  <div className="edit">
                     <Link to={`/write?edit=2`} state={post[0]}>
                        <AiTwotoneEdit size="23" />
                     </Link>
                     <span className="delete" onClick={handleDelete}>
                        <AiFillDelete size="23" />
                     </span>
                  </div>
               )}
            </div>
            <h1>{post[0].title}</h1>
            <p>{getText(post[0].desc)}</p>
         </div>

         <Menu cat={post[0].cat} />
      </div>
   );
};

export default Single;
