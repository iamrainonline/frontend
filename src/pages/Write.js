import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
   const state = useLocation().state;
   const [value, setValue] = useState(state?.desc || "");
   const [title, setTitle] = useState(state?.title || "");
   const [file, setFile] = useState(state?.img || "");
   // const [file, setFile] = useState(null);
   const [cat, setCat] = useState(state?.cat || "");

   const navigate = useNavigate();

   const upload = async () => {
      try {
         const formData = new FormData();
         formData.append("file", file);
         const res = await axios.post(
            "https://dull-rose-camel-garb.cyclic.app/api/upload",
            formData
         );
         return res.data;
      } catch (err) {
         console.log(err);
      }
   };
   const handleClick = async (e) => {
      e.preventDefault();
      const imgUrl = await upload();
      try {
         state
            ? await axios.put(
                 `https://dull-rose-camel-garb.cyclic.app/api/posts/${state.id}`,
                 {
                    title: title,
                    desc: value,
                    cat: cat,
                    img: file ? imgUrl : "",
                 }
              )
            : await axios.post(
                 `https://dull-rose-camel-garb.cyclic.app/api/posts/`,
                 {
                    title: title,
                    desc: value,
                    cat: cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                 }
              );
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div className="add">
         <div className="content">
            <input
               value={title}
               type="text"
               placeholder="title"
               onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
               <ReactQuill
                  className="editor"
                  theme="snow"
                  value={value}
                  onChange={setValue}
               />
            </div>
         </div>
         <div className="menu">
            <div className="item">
               <h1>Publish</h1>
               <span>
                  <b>Status: </b>
               </span>
               <span>
                  <b>Visibility: </b> Public
               </span>
               <input
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
               />
               <label className="file" htmlFor="file">
                  Upload Image
               </label>
               <div className="buttons">
                  <button>Save as a draft</button>
                  <button onClick={handleClick}>Publish</button>
               </div>
            </div>
            <div className="item">
               <h1>Category</h1>
               <div className="cat">
                  <input
                     checked={cat === "art"}
                     type="radio"
                     name="art"
                     value="art"
                     id="art"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="art">Art</label>
               </div>

               <div className="cat">
                  <input
                     checked={cat === "science"}
                     type="radio"
                     name="science"
                     value="science"
                     id="science"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science">Science</label>
               </div>

               <div className="cat">
                  <input
                     onChange={(e) => setCat(e.target.value)}
                     checked={cat === "technology"}
                     type="radio"
                     name="technology"
                     value="technology"
                     id="technology"
                  />
                  <label htmlFor="technology">Technology</label>
               </div>

               <div className="cat">
                  <input
                     checked={cat === "cinema"}
                     type="radio"
                     name="cinema"
                     value="cinema"
                     id="cinema"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="cinema">Cinema</label>
               </div>

               <div className="cat">
                  <input
                     checked={cat === "design"}
                     type="radio"
                     name="design"
                     value="design"
                     id="design"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
               </div>

               <div className="cat">
                  <input
                     checked={cat === "food"}
                     type="radio"
                     name="food"
                     value="food"
                     id="food"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food">Food</label>
               </div>
            </div>
         </div>
         <h1></h1>
      </div>
   );
};

export default Write;
