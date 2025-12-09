// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// Version 2
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./styles.css";
// import { AuthProvider } from "./AuthContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );

// Version 3

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

