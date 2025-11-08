import React, { useEffect, useState } from "react";
import { Authcontext } from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config.js";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
const axiosSecure=useAxiosSecure()

  // Register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Handle user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axiosSecure.post("/jwt", {
            email: currentUser.email,
          });
          if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
          }
        } catch (err) {
          console.error("JWT token fetch error:", err);
        }

        setUser(currentUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosSecure]);

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    return result;
  };

  const authInfo = {
    createUser,
    loginUser,
    logOutUser,
    loading,
    user,
    updateUserProfile,
    googleLogin,
  };

  return (
    <Authcontext.Provider value={authInfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
