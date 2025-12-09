// /* eslint react-refresh/only-export-components: "off" */

// import React, { createContext, useEffect, useState } from "react";
// import { setAuthToken } from "./api";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   // Load token and user from localStorage on first render (no effect needed)
//   const [token, setToken] = useState(() => localStorage.getItem("token"));
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   // You can keep this if you want a "loading" flag, but we just set it to false for now
//   const loading = false;

//   // Whenever token changes, update the Authorization header
//   useEffect(() => {
//     if (token) {
//       setAuthToken(token);
//     } else {
//       setAuthToken(null);
//     }
//   }, [token]);

//   function handleLogin(authData) {
//     setToken(authData.token);
//     setUser(authData.user);
//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", JSON.stringify(authData.user));
//   }

//   function handleLogout() {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }

//   const value = {
//     user,
//     token,
//     loading,
//     login: handleLogin,
//     logout: handleLogout,
//     isAdmin: user?.role === "admin",
//     isLoggedIn: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

/* eslint react-refresh/only-export-components: "off" */

import React, { createContext, useEffect, useState } from "react";
import { setAuthToken } from "./api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from localStorage (runs once on first render)
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const loading = false;

  // Keep axios Authorization header in sync with current token
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
  }, [token]);

  function login(auth) {
    setToken(auth.token);
    setUser(auth.user);
    localStorage.setItem("token", auth.token);
    localStorage.setItem("user", JSON.stringify(auth.user));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
