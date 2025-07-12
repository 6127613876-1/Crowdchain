import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../config/auth-firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../config/auth-firebase";
import { doc, setDoc } from "firebase/firestore";
import logo from "../assets/logo3.png";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const NavbarHome = () => {
  const [user, setUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const ADMIN_UID = "Dj8ZETe4vgXPn0lSv1IuTjG3L582";

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      // Save to Firestore
      const userDoc = {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userData.uid), userDoc);

      setAlertMessage("Sign-in successful! Welcome!");
      setAlertOpen(true);
    } catch (error) {
      console.error("Sign-in Error:", error);
      setAlertMessage("Sign-in failed. Please try again.");
      setAlertOpen(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAlertMessage("You have been logged out.");
      setAlertOpen(true);
    } catch (error) {
      console.error("Sign-out Error:", error);
      setAlertMessage("Sign-out failed. Please try again.");
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-sm shadow-sm z-50 bg-white bg-opacity-50 font-epilogue">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <button
                onClick={handleSignIn}
                className="px-4 py-2 text-[#ffde59] hover:scale-110 transition"
              >
                Sign In
              </button>
            ) : (
              <>
                {user?.uid === ADMIN_UID ? (
                  <button
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 text-[#ffde59] hover:scale-110 transition"
                  >
                    Admin Portal
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/home")}
                    className="px-4 py-2 text-[#ffde59] hover:scale-110 transition"
                  >
                    Start a Campaign
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-[#ffde59] hover:scale-110 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Alert */}
      <Box
        sx={{
          position: "fixed",
          top: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          zIndex: 1000,
        }}
      >
        <Collapse in={alertOpen}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default NavbarHome;
