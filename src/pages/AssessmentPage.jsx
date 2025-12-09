// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import api from "../api";

// export function AssessmentPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [assessment, setAssessment] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAssessment() {
//       try {
//         const response = await api.get(`/assessments/${id}`);
//         setAssessment(response.data);
//       } catch (error) {
//         console.error("Error loading assessment:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAssessment();
//   }, [id]);

//   function handleAnswerChange(questionId, value) {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   }

//   function handleNext() {
//     if (!assessment) return;
//     if (currentIndex < assessment.questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   }

//   function handleBack() {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   }

//   async function handleSubmitAssessment() {
//     if (!assessment) return;
//     setSubmitting(true);

//     try {
//       const responses = assessment.questions.map(q => ({
//         question_id: q.id,
//         response: answers[q.id] || "",
//       }));

//       const response = await api.post(
//         `/assessments/${assessment.id}/submit`,
//         { responses }
//       );

//       navigate(`/results/${assessment.id}`, {
//         state: { result: response.data },
//       });
//     } catch (error) {
//       console.error("Error submitting assessment:", error);
//       setSubmitting(false);
//     }
//   }

//   if (loading) {
//     return (
//       <main className="page">
//         <p>Loading assessment...</p>
//       </main>
//     );
//   }

//   if (!assessment) {
//     return (
//       <main className="page">
//         <p>Assessment not found.</p>
//         <Link to="/dashboard" className="btn btn-secondary">
//           Back to dashboard
//         </Link>
//       </main>
//     );
//   }

//   const questions = assessment.questions || [];
//   const currentQuestion = questions[currentIndex];

//   return (
//     <main className="page">
//       <h1>{assessment.title}</h1>
//       <p>
//         Question {currentIndex + 1} of {questions.length}
//       </p>

//       {currentQuestion ? (
//         <div className="question-box">
//           <p className="question-text">{currentQuestion.title}</p>
//           {currentQuestion.image_url && (
//             <img
//               src={currentQuestion.image_url}
//               alt="Question visual"
//               className="question-image"
//             />
//           )}
//           <textarea
//             rows={3}
//             value={answers[currentQuestion.id] || ""}
//             onChange={e =>
//               handleAnswerChange(currentQuestion.id, e.target.value)
//             }
//             placeholder="Type your answer here"
//           />
//         </div>
//       ) : (
//         <p>No questions for this assessment.</p>
//       )}

//       <div className="nav-row">
//         <button
//           className="btn btn-secondary"
//           onClick={handleBack}
//           disabled={currentIndex === 0}
//         >
//           Back
//         </button>
//         <Link to="/dashboard" className="btn btn-secondary">
//           Exit quiz
//         </Link>
//         <button
//           className="btn btn-primary"
//           onClick={
//             currentIndex === questions.length - 1
//               ? handleSubmitAssessment
//               : handleNext
//           }
//           disabled={submitting}
//         >
//           {currentIndex === questions.length - 1 ? "Submit quiz" : "Next"}
//         </button>
//       </div>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../api";


export function AssessmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    async function fetchAssessment() {
      try {
        setLoadError(null);
        const response = await api.get(`/assessments/${id}`);
        console.log("ASSESSMENT RESPONSE:", response.data);
        setAssessment(response.data);
      } catch (error) {
        console.error("Error loading assessment:", error);
        setLoadError("Could not load assessment.");
      } finally {
        setLoading(false);
      }
    }

    fetchAssessment();
  }, [id]);

  function handleAnswerChange(questionId, value) {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function handleNext() {
    if (!assessment) return;
    if (currentIndex < assessment.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  async function handleSubmitAssessment() {
    if (!assessment) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const responses = assessment.questions.map(q => ({
        question_id: q.id,
        response: answers[q.id] || "",
      }));

      console.log("SUBMIT PAYLOAD:", { responses });

      const response = await api.post(
        `/assessments/${assessment.id}/submit`,
        { responses }
      );

      console.log("SUBMIT RESPONSE:", response.data);

      // Go to results page with result data from backend
      navigate(`/results/${assessment.id}`, {
        state: { result: response.data },
      });
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setSubmitError("There was a problem submitting your quiz. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading assessment...</p>
      </main>
    );
  }

  if (loadError || !assessment) {
    return (
      <main className="page">
        <h1>Assessment</h1>
        <p>{loadError || "Assessment not found."}</p>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to dashboard
        </Link>
      </main>
    );
  }

  const questions = assessment.questions || [];
  const currentQuestion = questions[currentIndex];

  return (
    <main className="page">
      <h1>{assessment.title}</h1>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      {currentQuestion ? (
        <div className="question-box">
          <p className="question-text">{currentQuestion.title}</p>

          {currentQuestion.image_url && (
            <img
              src={`${API_BASE_URL}${currentQuestion.image_url}`}
              alt="Question visual"
              className="question-image"
            />
          )}

          <textarea
            rows={3}
            value={answers[currentQuestion.id] || ""}
            onChange={e => handleAnswerChange(currentQuestion.id, e.target.value)}
            placeholder="Type your answer here"
          />
        </div>
      ) : (
        <p>No questions for this assessment.</p>
      )}

      {submitError && (
        <p style={{ color: "red", marginTop: "8px" }}>{submitError}</p>
      )}

      <div className="nav-row">
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          Back
        </button>

        <Link to="/dashboard" className="btn btn-secondary">
          Exit quiz
        </Link>

        {currentIndex === questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmitAssessment}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit quiz"}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </main>
  );
}
