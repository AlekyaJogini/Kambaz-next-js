import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <textarea
        id="wd-description"
        rows={5}
        cols={50}
        defaultValue={'The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: your name and section, links to each of the lab assignments, and a link to the Kambaz application. The Kambaz application should include a link to navigate back to the landing page.'}
      />
      <br /><br />

      <table>
        <tbody>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* Assignment Group */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </select>
            </td>
          </tr>

          {/* Display Grade As */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </select>
            </td>
          </tr>

          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </select>
              <br /><br />
              <label>Online Entry Options</label><br />
              <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>

          {/* Assign To */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          {/* Due Date */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>

          {/* Available From */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            </td>
          </tr>

          {/* Until */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button>Cancel</button> <button>Save</button>
    </div>
  );
}
