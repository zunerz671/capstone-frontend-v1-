// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";

// export function DashboardPage() {
//   const [lessons, setLessons] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [lessonsRes, assessmentsRes] = await Promise.all([
//           api.get("/lessons"),
//           api.get("/assessments"),
//         ]);

//         setLessons(lessonsRes.data);
//         setAssessments(assessmentsRes.data);
//       } catch (error) {
//         console.error("Error loading dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <main className="page">
//         <p>Loading...</p>
//       </main>
//     );
//   }

//   return (
//     <main className="page page-dashboard">
//       <section className="hero">
//         <h1 className="hero-title">Håfa Adai!</h1>
//         <p className="hero-subtitle">
//           Choose a lesson or quiz to start practicing.
//         </p>
//       </section>

//       <section className="section">
//         <h2 className="section-title">Lessons</h2>
//         <div className="card-grid">
//           {lessons.map(lesson => (
//             <div key={lesson.id} className="card">
//               <h3 className="card-title">{lesson.title}</h3>
//               <p className="card-meta">
//                 {lesson.description || "Math lesson"}
//               </p>
//               <div className="card-footer">
//                 <Link to={`/lessons/${lesson.id}`} className="btn btn-primary">
//                   Start lesson
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="section">
//         <h2 className="section-title">Assessments</h2>
//         <div className="card-grid">
//           {assessments.map(assessment => (
//             <div key={assessment.id} className="card">
//               <h3 className="card-title">{assessment.title}</h3>
//               <p className="card-meta">
//                 {assessment.description || "Quiz or unit test"}
//               </p>
//               <div className="card-footer">
//                 <Link
//                   to={`/assessments/${assessment.id}`}
//                   className="btn btn-primary"
//                 >
//                   Start quiz
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export function DashboardPage() {
  const [lessons, setLessons] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [lessonsRes, assessmentsRes] = await Promise.all([
          api.get("/lessons"),
          api.get("/assessments"),
        ]);

        console.log("LESSONS RESPONSE:", lessonsRes.data);
        console.log("ASSESSMENTS RESPONSE:", assessmentsRes.data);

        setLessons(lessonsRes.data);
        setAssessments(assessmentsRes.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="page page-dashboard">
      <section className="hero">
        <h1 className="hero-title">Håfa Adai!</h1>
        <p className="hero-subtitle">
          Choose a lesson or quiz to start practicing.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Lessons</h2>
        <div className="card-grid">
          {lessons.length === 0 && <p>No lessons found.</p>}
          {lessons.map(lesson => (
            <div key={lesson.id} className="card">
              <h3 className="card-title">{lesson.title}</h3>
              <p className="card-meta">
                {lesson.description || "Math lesson"}
              </p>
              <div className="card-footer">
                <Link to={`/lessons/${lesson.id}`} className="btn btn-primary">
                  Start lesson
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Assessments</h2>
        <div className="card-grid">
          {assessments.length === 0 && <p>No assessments found.</p>}
          {assessments.map(assessment => (
            <div key={assessment.id} className="card">
              <h3 className="card-title">{assessment.title}</h3>
              <p className="card-meta">
                {assessment.description || "Quiz or unit test"}
              </p>
              <div className="card-footer">
                <Link
                  to={`/assessments/${assessment.id}`}
                  className="btn btn-primary"
                >
                  Start quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
