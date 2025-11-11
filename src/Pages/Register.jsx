// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import registerImg from "../assets/register.jpg";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useAuth } from "../Hooks/useAuth";

const Register = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { googleLogin, createUser, updateUserProfile } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
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
    return data.secure_url;
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
    // 1) upload image if provided

    try {
      let photoURL = "";
      if (file) {
        toast.loading("Uploading image...");
        photoURL = await uploadToCloudinary(file);
        toast.dismiss();
      }

      // 2) send registration to backend
      const userRes = await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL || "",
      });
      console.log(userRes);
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
      toast.success("Registration successful");
      setLoading(false);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err.message || "Registration error";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };
  const handleGoogleBtn = async () => {
    try {
      await googleLogin().then(async (result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          role: "user",
          photoURL: user.photoURL,
          loginType: "google",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        console.log("User info sending to backend:", userInfo);
        const userRes = await axiosSecure.post("/users", userInfo);
        console.log(userRes);
        toast.success("Logged in successfully");
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
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
          <h1 className="text-3xl my-4 font-semibold text-primary">
            Welcome to BookGalaxy
          </h1>
          <button
            type="button"
            onClick={handleFileClick}
            className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-primary"
            aria-label="Choose profile photo"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
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
        <button
          onClick={handleGoogleBtn}
          className="flex justify-center items-center gap-3 px-4 py-2 rounded-3xl shadow-md hover:shadow-lg transition w-full border border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          <span className="text-lg font-semibold">Google</span>
        </button>
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
          Already part of our community? Login to access your account and manage
          your books.
        </p>
        <Link to="/login">
          <button className="btn btn-outline btn-primary mb-6 px-6">
            Login
          </button>
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
