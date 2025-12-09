// import React, { useEffect, useState } from "react";
// import api from "../api";

// export function AdminUsersPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const response = await api.get("/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error loading users:", error);
//       }
//     }

//     fetchUsers();
//   }, []);

//   return (
//     <main className="page">
//       <h1>All Users</h1>
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(u => (
//             <tr key={u.id}>
//               <td>{u.id}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../api";

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoadError(null);
        const response = await api.get("/users");
        console.log("USERS RESPONSE:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error loading users:", error);
        setLoadError("Could not load users. You may not have admin access.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <h1>Admin – Users</h1>
        <p>Loading users...</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="page">
        <h1>Admin – Users</h1>
        <p style={{ color: "red" }}>{loadError}</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Admin – Users</h1>
      <p>View all registered users and their roles.</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>
                  {u.role === "admin" ? "Admin" : "Student"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
