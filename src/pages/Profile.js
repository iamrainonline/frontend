import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
   const { currentUser } = useContext(AuthContext);

   const [userlist, setUserList] = useState([]);
   const [userName, setUserName] = useState("");
   const [sortedUsers, setSortedUsers] = useState();
   const [modal, setModal] = useState(false);
   const [deleteId, setDeleteId] = useState("");
   const [userDeleted, setUserDeleted] = useState(false);
   const [file, setFile] = useState("");
   const [loggedUser, setloggedUser] = useState([]);
   const [bool, setBool] = useState(true);
   const [editprofile, setEditprofile] = useState(true);

   const navigate = useNavigate();
   // Edit Profile State
   const [inputs, setInputs] = useState({
      username: loggedUser[0]?.username
         ? currentUser.username
         : loggedUser[0]?.username,
      email: loggedUser[0]?.email ? currentUser.email : loggedUser[0]?.email,
      file: loggedUser[0]?.file ? currentUser.file : loggedUser[0]?.file,
      id: currentUser.id,
   });

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   // Get ALl users and Posts
   useEffect(() => {
      const loggedUniqueUser = async (e) => {
         try {
            const data = await axios.get(
               process.env.REACT_APP_BASE_URL + `/api/users/${currentUser.id}`,

               {
                  withCredentials: true,
               }
            );
            setloggedUser(data.data);
         } catch (e) {
            console.log(e);
         }
      };
      loggedUniqueUser();
   }, [bool]);

   // Get ALl users and Posts
   useEffect(() => {
      const getUsers = async (e) => {
         try {
            const data = await axios.get(
               process.env.REACT_APP_BASE_URL + "/api/profile",
               {
                  withCredentials: true,
               }
            );
            setUserList([data]);
         } catch (e) {
            console.log(e);
         }
      };
      getUsers();
   }, [modal, userDeleted]);

   useEffect(() => {
      if (userlist.length > 0) {
         const seen = [];
         const uniq = [];
         userlist[0].data.forEach((item) => {
            if (!seen.includes(item.username)) {
               uniq.push({
                  username: item.username,
                  email: item.email,
                  isAdmin: item.isAdmin,
                  id: item.id,
               });
               seen.push(item.username);
            }
         });
         setSortedUsers(uniq);
      }
   }, [userlist]);

   const handleId = (e) => {
      setUserName(e);
   };

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
   };

   const openModal = (e) => {
      setModal(true);
   };

   const deleteUser = async (e) => {
      try {
         await axios.delete(
            process.env.REACT_APP_BASE_URL + `/api/users/${deleteId}`,
            {
               withCredentials: true,
            }
         );
         setUserDeleted(true);
      } catch (err) {
         console.log(err);
      }
      // logout();
      navigate("/register");
   };

   const updateUser = async (e) => {
      try {
         await axios.put(
            process.env.REACT_APP_BASE_URL + `/api/users/${inputs.id}`,
            {
               username: inputs.username,
               email: inputs.email,
               img: file ? file : "",
            },
            {
               withCredentials: true,
            }
         );
      } catch (err) {
         console.log(err);
      }
      setBool(false);
      currentUser.username = inputs.username;
   };

   const filteredItems =
      userlist[0]?.data.filter((x) => x.username === userName) || [];

   // Image Upload
   const handleFile = async (event) => {
      const preset_key = "ctj6ghbk";
      const cloudName = "dgzmwwbwm";

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

         // If you want to store the URL in the state (e.g., using setFile), you can do it like this:
         setFile(parsed.secure_url);
      } else {
         // Handle the case when the secure_url property is not available
         console.error("secure_url not found in the parsed object.");
      }
   };
   return (
      <div className="profile">
         <div className="">
            <h1>
               Welcome to your profile, <b> {currentUser.username}</b>
            </h1>

            <div className="profileEdit">
               <div className="profileInputs">
                  <input
                     disabled={editprofile}
                     required
                     type="text"
                     placeholder="username"
                     name="username"
                     onChange={handleChange}
                     value={
                        inputs.username ? inputs.username : currentUser.username
                     }
                  />
                  <input
                     disabled={editprofile}
                     required
                     type="text"
                     placeholder="email"
                     name="email"
                     onChange={handleChange}
                     value={inputs.email ? inputs.email : currentUser.email}
                  />
                  <input
                     disabled={editprofile}
                     type="file"
                     name="image"
                     onChange={handleFile}
                  />

                  {editprofile ? (
                     ""
                  ) : (
                     <button onClick={updateUser}>Save</button>
                  )}
               </div>
               <div className="ImageAndDelete">
                  <img src={loggedUser[0]?.img} alt="" />
                  <div
                     className="editPencil"
                     onClick={() => setEditprofile(!editprofile)}
                  >
                     <AiFillEdit color="green" size="30" className="pencil" />{" "}
                     <p>Edit Profile</p>
                  </div>
               </div>
            </div>

            <p>
               <b>List of registered Users & posts by user </b>
            </p>
         </div>

         <div className="userlist">
            <div className="leftside">
               {sortedUsers?.map((item, key) => {
                  return (
                     <div className="users" key={key}>
                        <div
                           className="users-left"
                           onClick={() => {
                              setDeleteId(item.id);
                              handleId(item.username);
                           }}
                        >
                           <p>
                              <i>{item.username}</i>
                           </p>
                           <p>Admin: {item.isAdmin === 1 ? "True" : "False"}</p>
                        </div>
                        <div
                           className={
                              item.isAdmin === 1
                                 ? "users-right"
                                 : "users-right2"
                           }
                        >
                           {item.isAdmin === 1 ? (
                              <div className="adminsymbol">
                                 <MdAdminPanelSettings
                                    size="30"
                                    color="green"
                                 />
                              </div>
                           ) : (
                              <div
                                 className="deleteme"
                                 onClick={() => {
                                    openModal(item.id);
                                    setDeleteId(item.id);
                                 }}
                              >
                                 Delete Account
                                 <AiFillDelete color="red" size="30" />
                              </div>
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>

            <div className="rightside">
               <div>
                  {filteredItems.length === 1 ? (
                     <p className="ThisUserPosts">This user has no posts.</p>
                  ) : (
                     filteredItems.map((item, key) => (
                        <div key={key} className="post-list">
                           <p className="post-list-title">
                              {getText(item.title)}
                           </p>
                           <p>
                              {getText(item.desc)
                                 ?.substring(0, 90)
                                 .concat("...")}
                           </p>
                           <p>{moment(item.date).fromNow()}</p>
                           <Link
                              to={`/post/${item.postId}`}
                              className="link link-2"
                           >
                              Read More
                           </Link>
                        </div>
                     ))
                  )}
               </div>
            </div>
            {/* Modal */}
            {modal ? (
               <div className="modal">
                  <h3>Are you sure you want to delete your account?</h3>
                  <div className="modalbuttons">
                     <button
                        style={{ backgroundColor: "#3F8F29", color: "white" }}
                        onClick={() => {
                           setModal(false);
                           deleteUser();
                        }}
                     >
                        Yes
                     </button>
                     <button
                        style={{ backgroundColor: "#DE1A24", color: "white" }}
                        onClick={() => setModal(false)}
                     >
                        No
                     </button>
                  </div>
               </div>
            ) : (
               ""
            )}
         </div>
      </div>
   );
};

export default Profile;
