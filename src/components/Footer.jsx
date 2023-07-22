import React from "react";
import { GrInstall } from "react-icons/gr";

const Footer = () => {
   return (
      <footer>
         <GrInstall size="55" />
         <span>
            Made by Cristian with <i>[React, Scss, Mysql, Jwt]</i>
         </span>
         <span>7/2023</span>
         <div className="socials">
            <div>linkedIn: linkedIn</div>
            <div>twitter: @twitter</div>
            <div>github: github.com</div>
         </div>
      </footer>
   );
};

export default Footer;
