import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
   const [inputs, setInputs] = useState({
      username: "",
      password: "",
   });

   const [err, setError] = useState(null);
   const navigate = useNavigate();
   const { login } = useContext(AuthContext);

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await login(inputs);
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="auth">
         <h1>Login</h1>
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
               type="password"
               placeholder="password"
               name="password"
               onChange={handleChange}
            />
            <button onClick={handleSubmit}>Login</button>
            <p style={{ color: "green", fontSize: "18px" }}>Please log in!</p>
            <span>
               {err && <p>err</p>}
               <br />
               <div className="testUser">
                  <p>You prefer a test user?</p>
                  <br />
                  <p>
                     Username: <b>123</b> <br /> Password: <b>123</b>
                  </p>
               </div>

               <br />
               <Link to="/register">Register</Link>
            </span>
         </form>
      </div>
   );
};

export default Login;
