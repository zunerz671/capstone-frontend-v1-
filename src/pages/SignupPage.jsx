// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";
// import { AuthContext } from "../AuthContext";

// export function SignupPage() {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await api.post("/signup", {
//         email,
//         password,
//       });

//       // Same assumption: response contains { jwt, user }
//       login({
//         token: response.data.jwt,
//         user: response.data.user,
//       });

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError("Could not sign up. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="page">
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit} className="auth-form">
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button className="btn btn-primary" type="submit" disabled={loading}>
//           {loading ? "Creating account..." : "Create account"}
//         </button>

//         <p>
//           Already have an account?{" "}
//           <Link to="/login">Log in</Link>
//         </p>
//       </form>
//     </main>
//   );
// }


import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../AuthContext";

export function SignupPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/signup", {
        email,
        password,
      });

      // Backend returns { token, user } here too
      const { token, jwt, user } = response.data;
      const authToken = token || jwt;

      if (!authToken || !user) {
        console.error("Signup response missing token or user:", response.data);
        setError("Unexpected signup response from server.");
        setLoading(false);
        return;
      }

      login({
        token: authToken,
        user: user,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
