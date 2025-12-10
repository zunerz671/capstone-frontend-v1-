// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";
// import { AuthContext } from "../AuthContext";

// export function LoginPage() {
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
//       const response = await api.post("/login", {
//         email,
//         password,
//       });

//       // Adjust keys if your backend uses different names:
//       login({
//         token: response.data.jwt,
//         user: response.data.user,
//       });

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="page">
//       <h1>Login</h1>
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
//           {loading ? "Logging in..." : "Log in"}
//         </button>

//         <p>
//           Don&apos;t have an account?{" "}
//           <Link to="/signup">Sign up</Link>
//         </p>
//       </form>
//     </main>
//   );
// }

// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";
// import { AuthContext } from "../AuthContext";

// export function LoginPage() {
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
//       const response = await api.post("/login", {
//         email,
//         password,
//       });

//       // Your backend returns { token, user }
//       const { token, jwt, user } = response.data;
//       const authToken = token || jwt; // supports either key

//       if (!authToken || !user) {
//         console.error("Login response missing token or user:", response.data);
//         setError("Unexpected login response from server.");
//         setLoading(false);
//         return;
//       }

//       login({
//         token: authToken,
//         user: user,
//       });

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="page">
//       <h1>Login</h1>
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
//           {loading ? "Logging in..." : "Log in"}
//         </button>

//         <p>
//           Don&apos;t have an account?{" "}
//           <Link to="/signup">Sign up</Link>
//         </p>
//       </form>
//     </main>
//   );
// }

import React, { useContext, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../AuthContext";


export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // NEW: video ref + mute state
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, jwt, user } = response.data;
      const authToken = token || jwt;

      if (!authToken || !user) {
        console.error("Login response missing token or user:", response.data);
        setError("Unexpected login response from server.");
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
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;

    // If unmuting and video is paused (some browsers pause when audio toggles),
    // try to play it again.
    if (!nextMuted && video.paused) {
      video.play().catch(() => {
        console.log("Browser blocked autoplay with sound until user clicks play.");
      });
    }

    setMuted(nextMuted);
  };

  return (
    <main className="page">
      <div className="auth-layout">
        {/* Left side: video */}
        <div className="auth-video">
          <video
            ref={videoRef}
            className="auth-video-element"
            src="/videos/login-island.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="auth-video-overlay">
            <h1>Island Math</h1>
            <p>Made in Guam for island learners.</p>

            {/* NEW: mute/unmute button */}
            <button
              type="button"
              className="video-mute-toggle"
              onClick={handleToggleMute}
            >
              {muted ? "🔈" : "🔊"}
            </button>
          </div>
        </div>

        {/* Right side: login form */}
        <div className="auth-panel">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
