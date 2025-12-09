// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Layout } from "./Layout";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { AdminRoute } from "./AdminRoute";
// import { LoginPage } from "./pages/LoginPage";
// import { SignupPage } from "./pages/SignupPage";
// import { DashboardPage } from "./pages/DashboardPage";
// import { LessonPage } from "./pages/LessonPage";
// import { AssessmentPage } from "./pages/AssessmentPage";
// import { ResultsPage } from "./pages/ResultsPage";
// import { AdminUsersPage } from "./pages/AdminUsersPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Protected layout */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="/dashboard" />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="lessons/:id" element={<LessonPage />} />
//           <Route path="assessments/:id" element={<AssessmentPage />} />
//           <Route path="results/:assessmentId" element={<ResultsPage />} />

//           <Route
//             path="admin/users"
//             element={
//               <AdminRoute>
//                 <AdminUsersPage />
//               </AdminRoute>
//             }
//           />
//         </Route>

//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LessonPage } from "./pages/LessonPage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { ResultsPage } from "./pages/ResultsPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected layout (requires login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="lessons/:id" element={<LessonPage />} />
          <Route path="assessments/:id" element={<AssessmentPage />} />
          <Route path="results/:assessmentId" element={<ResultsPage />} />

          {/* Admin-only route */}
          <Route
            path="admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
