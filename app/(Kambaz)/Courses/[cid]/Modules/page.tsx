import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div>
      {/* Toolbar */}
      <ModulesControls />
      <br /><br /><br /><br />

      {/* Modules List */}
      <ListGroup id="wd-modules" className="rounded-0">

        {/* Week 1 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">

            {/* Lecture 1 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 1 – Course Introduction, Syllabus, Agenda
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Introduction to the course <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Learn what is Web Development <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 1 – Introduction <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 2 – Creating User Interfaces <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  SLIDES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Introduction to Web Development <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Creating an HTTP server with Node.js <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Creating a React Application <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>

            {/* Lecture 2 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 2 – Formatting User Interfaces with HTML
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Learn to create user interfaces with HTML <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Deploy lab assignments on Netlify <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Formatting content with Headings and Paragraphs <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Formatting content with Lists and Tables <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* Week 2 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">

            {/* Lecture 3 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 3 – Styling User Interfaces with CSS
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Understand CSS basics <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Style HTML elements using selectors <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 3 – CSS Basics <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  SLIDES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    CSS Selectors and Properties <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Box Model and Layout <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Colors, Fonts, and Backgrounds <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>

            {/* Lecture 4 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 4 – Advanced CSS
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Responsive design principles <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Using Flexbox and Grid <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 4 – Advanced CSS <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  SLIDES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Responsive Layouts <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Flexbox Examples <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Grid Layout Examples <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* Week 3 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 3 <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">

            {/* Lecture 5 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 5 – JavaScript Fundamentals
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Understand variables and data types <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Control structures and functions <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 5 – JavaScript Basics <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  SLIDES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    JavaScript Syntax <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Loops and Conditionals <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Functions <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>

            {/* Lecture 6 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Lecture 6 – DOM Manipulation
              <LessonControlButtons />
              <ListGroup className="wd-content rounded-0">
                <ListGroupItem className="wd-content-item">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Access and modify HTML elements <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Handle user events <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  READING <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    Full Stack Developer – Chapter 6 – DOM Manipulation <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
                <ListGroupItem className="wd-content-item">
                  SLIDES <LessonControlButtons />
                </ListGroupItem>
                <ListGroup className="rounded-0">
                  <ListGroupItem className="wd-content-item">
                    DOM API <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Event Listeners <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-content-item">
                    Dynamic Content <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
  );
}
