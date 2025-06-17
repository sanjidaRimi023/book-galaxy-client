import React, { useContext, useState } from "react";
import loginImg from "../assets/login.jpg";
import { Link, useLocation, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Authcontext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';


const Login = () => {
  const { loginUser, googleLogin } = useContext(Authcontext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const hangleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, password);
      toast.success("login successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setError("Login Failed! Please check your credentials.");
      toast.error("Login Failed");
    }
  };
  const handleGoogleBtn = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google successfully");
      navigate(from, { replace: true });
    } catch (error) {
       toast.error("Google Login Failed");
      console.log(error);
      setError("Google Login Failed");
     
    }
  };
  return (
    
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 p-4 container mx-auto">
       <Helmet>
                <title>BookGalaxy || Login</title>
            </Helmet>
      <motion.div
        className="w-full md:w-1/2 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-primary">New Here..?</h1>
        <p className="text-gray-600 text-sm mt-1 mb-3">
          Register to start reading, borrowing, and exploring the library.And
          Join our community to explore thousands of books, manage your personal
          reading list, and stay updated on the latest releases.
        </p>
        <Link to="/register">
          <button className="btn btn-outline btn-primary mb-6 px-6">
            Register
          </button>
        </Link>
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          src={loginImg}
          alt="Login Visual"
          className="w-full max-w-xs md:max-w-sm mx-auto border-l-8 border-b-8 border-primary rounded-t-[40px] rounded-br-[40px] shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center text-center space-y-5 bg-white shadow-lg p-6 rounded-3xl max-w-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-primary">Log In</h1>
        <form onSubmit={hangleLogin} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            autoComplete="current-email"
            required
            className="input w-full rounded-2xl"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input w-full rounded-2xl"
          />
          <button className="btn btn-primary w-full text-xl mt-2">Login</button>
        </form>

        <div className="divider divider-neutral text-black w-full">
          OR LOGIN WITH
        </div>

        <button
          onClick={handleGoogleBtn}
          className="flex justify-center items-center gap-3 px-4 py-2 rounded-3xl shadow-md hover:shadow-lg transition w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            viewBox="0 0 256 262"
            id="google"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span className="text-lg text-black font-semibold">Google</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
