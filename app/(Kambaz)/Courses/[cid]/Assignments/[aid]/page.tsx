"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Card>
        {/* Header */}
        <Card.Header as="h5" className="bg-light">
          Edit Assignment
        </Card.Header>

        {/* Body */}
        <Card.Body>
          <Form>
            {/* Assignment Name */}
            <Form.Group className="mb-3" controlId="wd-name">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="wd-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: your name and section, links to each of the lab assignments, and a link to the Kambaz application. The Kambaz application should include a link to navigate back to the landing page.`}
              />
            </Form.Group>

            <Row className="mb-3">
              {/* Points */}
              <Form.Group as={Col} controlId="wd-points">
                <Form.Label>Points</Form.Label>
                <Form.Control type="number" defaultValue={100} />
              </Form.Group>

              {/* Assignment Group */}
              <Form.Group as={Col} controlId="wd-group">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select defaultValue="ASSIGNMENTS">
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>EXAMS</option>
                  <option>PROJECT</option>
                </Form.Select>
              </Form.Group>

              {/* Display Grade As */}
              <Form.Group as={Col} controlId="wd-display-grade-as">
                <Form.Label>Display Grade As</Form.Label>
                <Form.Select defaultValue="Percentage">
                  <option>Percentage</option>
                  <option>Points</option>
                  <option>Complete/Incomplete</option>
                </Form.Select>
              </Form.Group>
            </Row>

            {/* Submission Type */}
            <Form.Group className="mb-3" controlId="wd-submission-type">
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="Online" className="mb-2">
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </Form.Select>

              <Form.Label>Online Entry Options</Form.Label>
              <div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
              </div>
            </Form.Group>

            {/* Assign To */}
            <Form.Group className="mb-3" controlId="wd-assign-to">
              <Form.Label>Assign To</Form.Label>
              <Form.Control type="text" defaultValue="Everyone" />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="wd-due-date">
                <Form.Label>Due</Form.Label>
                <Form.Control type="date" defaultValue="2024-05-13" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="wd-available-from">
                <Form.Label>Available from</Form.Label>
                <Form.Control type="date" defaultValue="2024-05-06" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="wd-available-until">
                <Form.Label>Until</Form.Label>
                <Form.Control type="date" defaultValue="2024-05-20" />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>

        {/* Footer */}
        <Card.Footer className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
