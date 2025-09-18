import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Search + Buttons */}
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      {/* ASSIGNMENTS Group */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            <strong>A1 - ENV + HTML</strong>
          </Link>
          <div className="wd-assignment-details">
            Due May 13 at 11:59pm | 100 pts | Not Submitted
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link">
            <strong>A2 - CSS + BOOTSTRAP</strong>
          </Link>
          <div className="wd-assignment-details">
            Due May 20 at 11:59pm | 100 pts | Not Submitted
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link">
            <strong>A3 - JAVASCRIPT</strong>
          </Link>
          <div className="wd-assignment-details">
            Due May 27 at 11:59pm | 100 pts | Not Submitted
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/126" className="wd-assignment-link">
            <strong>A4 - REACT + STATE</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jun 3 at 11:59pm | 100 pts | Not Submitted
          </div>
        </li>
      </ul>

      {/* QUIZZES Group */}
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/201" className="wd-assignment-link">
            <strong>Q1 - HTML Basics</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jun 5 at 11:59pm | 20 pts | Not Submitted
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/202" className="wd-assignment-link">
            <strong>Q2 - CSS Basics</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jun 12 at 11:59pm | 20 pts | Not Submitted
          </div>
        </li>
      </ul>

      {/* EXAMS Group */}
      <h3 id="wd-exams-title">
        EXAMS 30% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/301" className="wd-assignment-link">
            <strong>Midterm Exam</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jun 15 at 11:59pm | 150 pts | Not Submitted
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/302" className="wd-assignment-link">
            <strong>Final Exam</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jul 1 at 11:59pm | 200 pts | Not Submitted
          </div>
        </li>
      </ul>

      {/* PROJECTS Group */}
      <h3 id="wd-projects-title">
        PROJECTS 20% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/401" className="wd-assignment-link">
            <strong>Final Project - Full Stack Web App</strong>
          </Link>
          <div className="wd-assignment-details">
            Due Jul 10 at 11:59pm | 300 pts | Not Submitted
          </div>
        </li>
      </ul>
    </div>
  );
}