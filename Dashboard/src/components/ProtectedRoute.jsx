import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Extract token from URL if present (coming from login/signup redirect)
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);

      const nameFromURL = params.get("name");
      if (nameFromURL) {
        localStorage.setItem("user", JSON.stringify({ name: nameFromURL }));
      }

      // Clean params from URL without reload
      window.history.replaceState({}, "", window.location.pathname);
    }

    setIsReady(true);
  }, []);

  // Wait until token extraction is done
  if (!isReady) return null;

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "https://zerodha-frontend-kl3m.onrender.com/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;
