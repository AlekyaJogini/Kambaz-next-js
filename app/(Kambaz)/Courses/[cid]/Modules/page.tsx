export default function Modules() {
  return (
    <div>
      {/* Toolbar Buttons */}
      <div id="wd-modules-toolbar">
        <button>Collapse All</button>{" "}
        <button>View Progress</button>{" "}
        <select defaultValue="publish">
          <option value="publish">Publish All</option>
          <option value="unpublish">Unpublish All</option>
        </select>{" "}
        <button>+ Module</button>
      </div>

      <hr />

      {/* Modules List */}
      <ul id="wd-modules">
        {/* Week 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            {/* Lecture 1 */}
            <li className="wd-lesson">
              <span className="wd-title">
                Lecture 1 – Course Introduction, Syllabus, Agenda
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 1 – Introduction
                  </li>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 2 – Creating User Interfaces
                  </li>
                </ul>
                <li className="wd-content-item">SLIDES</li>
                <ul>
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </ul>
            </li>

            {/* Lecture 2 */}
            <li className="wd-lesson">
              <span className="wd-title">
                Lecture 2 – Formatting User Interfaces with HTML
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">
                    Learn to create user interfaces with HTML
                  </li>
                  <li className="wd-content-item">
                    Deploy lab assignments on Netlify
                  </li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Formatting content with Headings and Paragraphs
                  </li>
                  <li className="wd-content-item">
                    Formatting content with Lists and Tables
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            {/* Lecture 3 */}
            <li className="wd-lesson">
              <span className="wd-title">Lecture 3 – Styling User Interfaces with CSS</span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">Understand CSS basics</li>
                  <li className="wd-content-item">Style HTML elements using selectors</li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 3 – CSS Basics
                  </li>
                </ul>
                <li className="wd-content-item">SLIDES</li>
                <ul>
                  <li className="wd-content-item">CSS Selectors and Properties</li>
                  <li className="wd-content-item">Box Model and Layout</li>
                  <li className="wd-content-item">Colors, Fonts, and Backgrounds</li>
                </ul>
              </ul>
            </li>

            {/* Lecture 4 */}
            <li className="wd-lesson">
              <span className="wd-title">Lecture 4 – Advanced CSS</span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">Responsive design principles</li>
                  <li className="wd-content-item">Using Flexbox and Grid</li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 4 – Advanced CSS
                  </li>
                </ul>
                <li className="wd-content-item">SLIDES</li>
                <ul>
                  <li className="wd-content-item">Responsive Layouts</li>
                  <li className="wd-content-item">Flexbox Examples</li>
                  <li className="wd-content-item">Grid Layout Examples</li>
                </ul>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            {/* Lecture 5 */}
            <li className="wd-lesson">
              <span className="wd-title">Lecture 5 – JavaScript Fundamentals</span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">Understand variables and data types</li>
                  <li className="wd-content-item">Control structures and functions</li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 5 – JavaScript Basics
                  </li>
                </ul>
                <li className="wd-content-item">SLIDES</li>
                <ul>
                  <li className="wd-content-item">JavaScript Syntax</li>
                  <li className="wd-content-item">Loops and Conditionals</li>
                  <li className="wd-content-item">Functions</li>
                </ul>
              </ul>
            </li>

            {/* Lecture 6 */}
            <li className="wd-lesson">
              <span className="wd-title">Lecture 6 – DOM Manipulation</span>
              <ul className="wd-content">
                <li className="wd-content-item">LEARNING OBJECTIVES</li>
                <ul>
                  <li className="wd-content-item">Access and modify HTML elements</li>
                  <li className="wd-content-item">Handle user events</li>
                </ul>
                <li className="wd-content-item">READING</li>
                <ul>
                  <li className="wd-content-item">
                    Full Stack Developer – Chapter 6 – DOM Manipulation
                  </li>
                </ul>
                <li className="wd-content-item">SLIDES</li>
                <ul>
                  <li className="wd-content-item">DOM API</li>
                  <li className="wd-content-item">Event Listeners</li>
                  <li className="wd-content-item">Dynamic Content</li>
                </ul>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
