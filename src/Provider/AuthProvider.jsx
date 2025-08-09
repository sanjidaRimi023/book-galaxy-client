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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  // register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // updateProfile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
  //     setUser(CurrentUser);
  //     setLoading(false);
  //   });
  //   return () => unSubscribe();
  // }, []);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User changed:", currentUser);

      if (currentUser?.email) {
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser.email,
          })
          .then((res) => {
            console.log("JWT response:", res.data);
            localStorage.setItem("token", res.data.token);
          })
          .catch((err) => {
            console.error("JWT creation failed:", err);
          });
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // google login
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
