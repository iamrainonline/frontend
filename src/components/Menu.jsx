import { React, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ cat }) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(
               `https://dull-rose-camel-garb.cyclic.app/api/posts/?cat=${cat}`,
               {
                  withCredentials: true,
               }
            );
            setPosts(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [cat]);

   return (
      <div className="menu">
         <h1>Other posts you may like</h1>
         {posts.map((post) => (
            <div className="post" key={post.id}>
               <img src={`../upload/${post?.img}`} alt="" />
               <h2>{post.title}</h2>

               <Link className="link" to={`/post/${post.id}`}>
                  <button>Read more</button>
               </Link>
            </div>
         ))}
      </div>
   );
};

export default Menu;
