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
   const uploadImage = (files) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      console.log(formData);
      formData.append("upload_preset", "ctj6ghbk");

      axios
         .post("https://api.cloudinary.com/v1_1/dgzmwwbwm", formData)
         .then((response) => {
            console.log(response);
         });
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
                    img: file ? imgUrl : "",
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
                    img: file ? imgUrl : "",
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
                  onChange={(e) => uploadImage(e.target.files)}
                  // style={{ display: "none" }}
                  type="file"
                  // name="file"
                  // id="file"
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
