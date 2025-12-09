// import React from "react";
// import { Link, useLocation, useParams } from "react-router-dom";

// export function ResultsPage() {
//   const { assessmentId } = useParams(); // not required, but available
//   const location = useLocation();
//   const result = location.state?.result;

//   if (!result) {
//     return (
//       <main className="page">
//         <h1>Results</h1>
//         <p>No result data found. Try taking the assessment again.</p>
//         <Link to="/dashboard" className="btn btn-primary">
//           Back to dashboard
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="page">
//       <h1>Results</h1>
//       <p className="badge-score">
//         You scored {result.correct_count} out of {result.total}
//       </p>

//       <section className="section">
//         <h2 className="section-title">Question breakdown</h2>
//         <ul>
//           {result.details.map((detail, index) => (
//             <li key={index}>
//               <strong>Q{index + 1}:</strong> {detail.question_title}
//               <br />
//               Your answer: {detail.response || "(no answer)"}
//               <br />
//               Correct answer: {detail.correct_answer}
//               <br />
//               {detail.correct ? (
//                 <span className="tag-correct">Correct ✓</span>
//               ) : (
//                 <span className="tag-incorrect">Incorrect ✗</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>

//       <div className="nav-row">
//         <Link to="/dashboard" className="btn btn-primary">
//           Back to dashboard
//         </Link>
//       </div>
//     </main>
//   );
// }

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export function ResultsPage() {
  const { assessmentId } = useParams();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <main className="page">
        <h1>Results</h1>
        <p>No result data found. Try taking the assessment again.</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Results</h1>
      <p className="badge-score">
        You scored {result.correct_count} out of {result.total}
      </p>

      <section className="section">
        <h2 className="section-title">Question breakdown</h2>
        <ul>
          {result.details.map((detail, index) => (
            <li key={index}>
              <strong>Q{index + 1}:</strong> {detail.question_title}
              <br />
              Your answer: {detail.response || "(no answer)"}
              <br />
              Correct answer: {detail.correct_answer}
              <br />
              {detail.correct ? (
                <span className="tag-correct">Correct ✓</span>
              ) : (
                <span className="tag-incorrect">Incorrect ✗</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="nav-row">
        <Link to="/dashboard" className="btn btn-primary">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
