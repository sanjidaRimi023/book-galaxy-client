// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import registerImg from "../assets/register.jpg";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Register = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [file, setFile] = useState(null); // actual File
  const [preview, setPreview] = useState(null); // preview URL
  const [loading, setLoading] = useState(false);
const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const from = location.state?.from?.pathname || "/";

  // OPEN file dialog programmatically
  const fileInputRef = React.useRef();

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Upload image to Cloudinary (unsigned preset)
  const uploadToCloudinary = async (imageFile) => {
    if (!imageFile) return null;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;


    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const fd = new FormData();
    fd.append("file", imageFile);
    fd.append("upload_preset", uploadPreset);

    const res = await fetch(url, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Cloudinary upload failed: " + text);
    }

    const data = await res.json();
    return data.secure_url; // final image URL
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // password rule: at least 1 lowercase, 1 uppercase, min 6 chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    

    if (!passwordRegex.test(password)) {
      setLoading(false);
      const msg =
        "Password must have at least 1 uppercase, 1 lowercase letter & be at least 6 characters.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      // 1) upload image if provided
      let photoURL = "";
      if (file) {
        toast.loading("Uploading image...");
        photoURL = await uploadToCloudinary(file);
        toast.dismiss(); // remove loading
      }

      // 2) send registration to backend
      const payload = {
        name,
        email,
        password,
        photoURL,
        loginType: "manual",
      };
      const res = await axiosSecure.post("/users", payload);
      const data = res.data;
      if (!data.success) {
  toast.error(data.message || "Registration failed");
  setLoading(false);
  return;
}
      toast.success("Registration successful. Please login.");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err.message || "Registration error";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 gap-8 container mx-auto">
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center text-center space-y-5 shadow-lg p-6 rounded-3xl max-w-md border border-primary"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl my-4 font-semibold text-primary">Welcome to BookGalaxy</h1>
          <button
            type="button"
            onClick={handleFileClick}
            className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-primary"
            aria-label="Choose profile photo"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        

        <form onSubmit={handleRegister} className="w-full space-y-4">
          <input
            type="text"
            name="name"
            required
            className="input w-full rounded-2xl"
            placeholder="Your Name"
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            autoComplete="email"
            required
            className="input w-full rounded-2xl"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              autoComplete="new-password"
              required
              className="input w-full rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="btn btn-xs absolute top-2 right-4"
            >
              {showPass ? <Eye /> : <EyeOff />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full text-xl mt-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider divider-neutral w-full">Or Register with</div>

        <Link to="/login" className="text-sm text-gray-600 mt-2">
          Already have an account? Login
        </Link>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-primary">One of us..?</h1>
        <p className="text-gray-600 text-sm mt-1 mb-3">
          Already part of our community? Login to access your account and manage your books.
        </p>
        <Link to="/login">
          <button className="btn btn-outline btn-primary mb-6 px-6">Login</button>
        </Link>
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          src={registerImg}
          alt="Register Visual"
          className="w-full max-w-xs md:max-w-sm mx-auto rounded-t-[40px] rounded-br-[40px] shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Register;
