import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

const Start = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Simplified check
    });

    return () => unsubscribe();
  }, []); // Don't pass `auth` as dependency (it's stable)

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      navigate(location.state?.from || '/home'); // Optional: navigate to previous page or /home
    } catch (error) {
      console.error('Sign-in failed:', error);
      alert('Sign-in failed. Please try again.');
    }
  };

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 text-black font-epilogue text-center">
      <h2 className="text-4xl font-bold mb-6">Let's Get Started Creating a Campaign!</h2>
      <p className="text-xl mb-6">Donate for the needy or raise funds for a cause close to your heart.</p>

      <button
        onClick={isAuthenticated ? handleStart : handleSignIn}
        className="mt-4 px-8 py-3 text-[#ffde59] text-xl font-semibold hover:scale-110 transition duration-300 ease-in-out"
      >
        {isAuthenticated ? 'Start Now' : 'Sign In with Google'}
      </button>
    </section>
  );
};

export default Start;
