import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
   const [logged, setLogged] = useState(false);
   const [logerror, setlogError] = useState("");
   const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (inputs.username.length < 3) {
         setlogError("Username must be at least 3 letters long!");
         return;
      }
      if (inputs.username.includes(" ")) {
         setlogError("Username can't have empty spaces");
         return;
      }
      try {
         const response = await axios.post("/api/auth/register", inputs);
         if (response.status === 200) {
            setLogged(true);
            setlogError("You account has been created");
            setTimeout(() => {
               navigate("/login");
            }, 2000);
         }
      } catch (err) {
         console.log(err);
         setlogError("Erorr");
      }
   };
   return (
      <div className="auth">
         <h1>Register</h1>
         <form action="">
            <input
               required
               type="text"
               placeholder="username"
               name="username"
               onChange={handleChange}
            />
            <input
               required
               type="text"
               placeholder="email"
               name="email"
               onChange={handleChange}
            />
            <input
               required
               type="password"
               placeholder="password"
               name="password"
               onChange={handleChange}
            />
            <button onClick={handleSubmit}>Register</button>
            <p
               style={{
                  color: "#00610E",
                  fontSize: "16px",
                  fontWeight: "bold",
               }}
            >
               {logerror}
            </p>
            <span>
               You already have an account?
               <br />
               <br />
               <Link to="/login">Login</Link>
            </span>
         </form>
      </div>
   );
};

export default Register;
