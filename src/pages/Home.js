import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import BSC from "../Carousel/BSCarousel";

const Home = () => {
   const [posts, setPosts] = useState([]);
   const cat = useLocation().search;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(
               process.env.REACT_APP_BASE_URL + `/api/posts${cat}`,
               {
                  withCredentials: true, // Send credentials (cookies) along with the request
               }
            );
            setPosts(res.data.reverse());
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [cat]);

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
   };
   return (
      <div className="home">
         <div className="carouselparent">
            <div className="infomain">
               <h1>Chronicles of a Renaissance Soul: </h1>
               <p>Exploring Food, Science, Cinema, and Beyond</p>
               <Link className="link" to="/post/35">
                  Read More
               </Link>
            </div>
            <div className="carousel">
               <BSC posts={posts} />
            </div>
         </div>

         <div className="posts">
            {posts.map((post, key) => {
               return (
                  <div className="post" key={key}>
                     <div className="img">
                        <img src={`${post.img}`} alt="" />
                     </div>
                     <div className="content">
                        <Link className="link" to={`/post/${post.id}`}>
                           <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.desc)}</p>
                        <Link className="link" to={`/post/${post.id}`}>
                           <p className="cat">Category: {post.cat}</p>
                           <button>Read More</button>
                        </Link>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Home;
