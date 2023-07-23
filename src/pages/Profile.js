import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import Img from "./Portrat.jpg";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
   const { currentUser } = useContext(AuthContext);

   const [userlist, setUserList] = useState([]);
   const [userName, setUserName] = useState("");
   const [sortedUsers, setSortedUsers] = useState();
   const [modal, setModal] = useState(false);
   const [deleteId, setDeleteId] = useState("");

   useEffect(() => {
      const getUsers = async (e) => {
         try {
            const data = await axios.get(
               "https://calm-puce-lobster-toga.cyclic.app/api/profile",
               {
                  params: { id: "1" },
               },
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
   }, []);

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
      console.log(deleteId);
      try {
         await axios.delete(
            `https://calm-puce-lobster-toga.cyclic.app/api/users/${deleteId}`
         ),
            {
               withCredentials: true,
            };
      } catch (err) {
         console.log(err);
      }
   };

   const filteredItems =
      userlist[0]?.data.filter((x) => x.username === userName) || [];
   return (
      <div className="profile">
         <div className="welcome-message">
            <h1>Welcome to your profile,</h1>
            <p>
               Admin <b> {currentUser.username}</b>
            </p>
            <div className="editprofile">
               <div className="profiledit">
                  <input type="text" value={currentUser.username} readOnly />
                  <input type="text" value={currentUser.email} readOnly />
                  <input type="file" name="image" />
                  <button>Save</button>
               </div>
               <div className="profileimg">
                  <img src={Img} alt="" />
               </div>
            </div>
            <p>
               <b>List of registered Users & posts by user</b>
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
                              deleteUser();
                              handleId(item.username);
                           }}
                        >
                           <p>
                              Username: <i>{item.username}</i>
                           </p>
                           <p> Email: {item.email}</p>
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
                  <h3>Are you sure you want to delete this user?</h3>
                  <div className="modalbuttons">
                     <button
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => {
                           setModal(false);
                           deleteUser();
                           window.location.reload();
                        }}
                     >
                        Yes
                     </button>
                     <button
                        style={{ backgroundColor: "red", color: "white" }}
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
