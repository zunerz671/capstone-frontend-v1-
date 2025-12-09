// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../api";

// export function LessonPage() {
//   const { id } = useParams();
//   const [lesson, setLesson] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchLesson() {
//       try {
//         const response = await api.get(`/lessons/${id}`);
//         setLesson(response.data);
//         setCurrentIndex(0);
//       } catch (error) {
//         console.error("Error loading lesson:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchLesson();
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="page">
//         <p>Loading lesson...</p>
//       </main>
//     );
//   }

//   if (!lesson) {
//     return (
//       <main className="page">
//         <p>Lesson not found.</p>
//         <Link to="/dashboard" className="btn btn-secondary">
//           Back to dashboard
//         </Link>
//       </main>
//     );
//   }

//   const pages = lesson.lesson_pages || [];
//   const currentPage = pages[currentIndex];

//   function handleNext() {
//     if (currentIndex < pages.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   }

//   function handleBack() {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   }

//   return (
//     <main className="page">
//       <h1>{lesson.title}</h1>
//       <p>
//         Page {currentIndex + 1} of {pages.length}
//       </p>

//       {currentPage ? (
//         <div className="lesson-image-wrapper">
//           <img
//             src={currentPage.image_url}
//             alt={`Page ${currentIndex + 1}`}
//             className="lesson-image"
//           />
//         </div>
//       ) : (
//         <p>No pages for this lesson yet.</p>
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
//           Exit lesson
//         </Link>
//         <button
//           className="btn btn-primary"
//           onClick={handleNext}
//           disabled={currentIndex === pages.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../api";

export function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await api.get(`/lessons/${id}`);
        setLesson(response.data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <p>Loading lesson...</p>
      </main>
    );
  }

  if (!lesson) {
    return (
      <main className="page">
        <p>Lesson not found.</p>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to dashboard
        </Link>
      </main>
    );
  }

  const pages = lesson.lesson_pages || [];
  const currentPage = pages[currentIndex];

  function handleNext() {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <main className="page">
      <h1>{lesson.title}</h1>
      <p>
        Page {currentIndex + 1} of {pages.length}
      </p>

      {currentPage ? (
        <div className="lesson-image-wrapper">
          {/* <img
            src={currentPage.image_url}
            alt={`Page ${currentIndex + 1}`}
            className="lesson-image"
          /> */}
          <img
            src={`${API_BASE_URL}${currentPage.image_url}`}
            alt={`Page ${currentIndex + 1}`}
            className="lesson-image"
          />
        </div>
      ) : (
        <p>No pages for this lesson yet.</p>
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
          Exit lesson
        </Link>

        {/* <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentIndex === pages.length - 1}
        >
          Next
        </button> */}

        {currentIndex < pages.length - 1 && (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}

      </div>
    </main>
  );
}
