// import React, { useContext } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export function Layout() {
//   const { user, logout, isAdmin } = useContext(AuthContext);

//   return (
//     <div>
//       <header className="header">
//         <div className="header-left">
//           <Link to="/dashboard" className="logo">
//             Island Math
//           </Link>
//         </div>
//         <nav className="header-right">
//           {user && (
//             <>
//               <span className="header-user">Håfa Adai, {user.email}</span>
//               <Link to="/dashboard">Dashboard</Link>
//               {isAdmin && <Link to="/admin/users">Admin</Link>}
//               <button className="btn btn-secondary" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           )}
//           {!user && (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Sign up</Link>
//             </>
//           )}
//         </nav>
//       </header>

//       <Outlet />

//       <footer className="footer">
//         <p>Made in Guam for island learners 🌴</p>
//       </footer>
//     </div>
//   );
// }

import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function Layout() {
  const { user, logout, isAdmin } = useContext(AuthContext);

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            Island Math
          </Link>
        </div>
        <nav className="header-right">
          {user && (
            <>
              <span className="header-user">Håfa Adai, {user.email}</span>
              <Link to="/dashboard">Dashboard</Link>
              {isAdmin && <Link to="/admin/users">Admin</Link>}
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <p>Made in Guam for island learners 🌴</p>
      </footer>
    </div>
  );
}
