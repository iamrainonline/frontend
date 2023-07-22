import React, { useEffect, useState } from "react";

const Whattodo = () => {
   const [num, setNum] = useState(null); // Change initial value to null
   const [openTodo, setopenTodo] = useState(true); // Change initial value to null
   const [options, setOptions] = useState(false); // Change initial value to null

   const fakeApi = [
      {
         name: "Login & Auth",
         info: (
            <>
               <li>You can sing up</li> <br />{" "}
               <li>Login with your username & password</li> <br />{" "}
               <li>Check your profile and your posts</li>
            </>
         ),
         id: 0,
      },
      {
         name: "Posting and Deleting",
         info: (
            <>
               <li>You can create a post</li> <br />{" "}
               <li>You can edit it and delete it</li> <br />{" "}
               <li>Sort and create a category!</li>
            </>
         ),
         id: 1,
      },
      {
         name: "Profile & Users",
         info: (
            <>
               <li>Create a profile</li> <br /> <li>Track your posts</li> <br />{" "}
               <li>Or delete your account</li>
            </>
         ),
         id: 2,
      },
      {
         name: "Tools & Techologies",
         info: (
            <>
               <li>ReactJS, SasS & usContext store</li>
               <br /> <li>NodeJs & Expresjs</li> <br />
               <li>MySQL & JWT</li>
            </>
         ),
         id: 3,
      },
   ];

   const handleAccordionClick = (idx) => {
      if (num === idx) {
         // Clicked on the already open item, so close it
         setNum(null);
      } else {
         // Clicked on a different item, so toggle it open
         setNum(idx);
      }
   };

   const testMe = () => {
      setOptions(!options);
   };

   const closeHelper = () => {
      setopenTodo(!openTodo);
      setOptions(!options);
   };
   return (
      <div>
         <div className="mainparent">
            <div
               className={openTodo ? "close" : "newclose"}
               onClick={closeHelper}
            >
               {openTodo ? "X" : "Open Guide"}
            </div>
            <div
               className={openTodo ? "whattodo" : "whatnottodo"}
               style={openTodo ? {} : { display: "none" }}
            >
               <div className="clicktoggle" onClick={testMe}>
                  <h1>What to do?</h1>
                  <br />
                  <p>{options ? "Close Menu" : "Click Here!"}</p>
               </div>

               <div className={options ? "todolist" : "todoNotlist"}>
                  {fakeApi.map((item, idx) => (
                     <div className="all" key={idx}>
                        <p onClick={() => handleAccordionClick(idx)}>
                           {item.name}
                        </p>
                        <div
                           className={item.id === num ? "default" : "fakeApi"}
                        >
                           {item.id === num ? item.info : ""}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Whattodo;
