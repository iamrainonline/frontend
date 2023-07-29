import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Cloudinary } from "@cloudinary/url-gen";

const Write = () => {
   const state = useLocation().state;
   const [value, setValue] = useState(state?.desc || "");
   const [title, setTitle] = useState(state?.title || "");
   const [file, setFile] = useState(state?.img || "");
   const [cat, setCat] = useState(state?.cat || "");

   const navigate = useNavigate();

   const upload = async () => {
      try {
         const formData = new FormData();
         formData.append("file", file);
         const res = await axios.post(
            process.env.REACT_APP_BASE_URL + "/api/upload",
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            },
            {
               withCredentials: true,
            }
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
                 process.env.REACT_APP_BASE_URL + `/api/posts/${state.id}`,
                 {
                    title: title,
                    desc: value,
                    cat: cat,
                    img: file ? file : "",
                 },
                 {
                    withCredentials: true,
                 }
              )
            : await axios.post(
                 process.env.REACT_APP_BASE_URL + `/api/posts/`,
                 {
                    title: title,
                    desc: value,
                    cat: cat,
                    img: file ? file : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                 },
                 {
                    withCredentials: true,
                 }
              );
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };
   const preset_key = "ctj6ghbk";
   const cloudName = "dgzmwwbwm";

   const handleFile = async (event) => {
      const file = event.target.files[0];
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", preset_key);

      const fetched = await fetch(url, {
         method: "post",
         body: data,
      });

      const parsed = await fetched.json();
      // Check if the secure_url property is available in the parsed object
      if (parsed.secure_url) {
         // Access the secure_url property and use it as needed
         // console.log(parsed.secure_url);
         // If you want to store the URL in the state (e.g., using setFile), you can do it like this:
         setFile(parsed.secure_url);
      } else {
         // Handle the case when the secure_url property is not available
         console.error("secure_url not found in the parsed object.");
      }

      console.log(file);
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
                  {state ? "Editing" : "New Post"}
               </span>
               <span>
                  <b>Visibility: </b> Public
               </span>
               <input
                  onChange={handleFile}
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
               />

               <div className="buttons">
                  <label className="file" htmlFor="file">
                     Upload Image
                  </label>
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
