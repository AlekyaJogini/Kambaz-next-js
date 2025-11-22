"use client";
import React, { useState, useEffect } from "react";  // ✅ ADD useEffect
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";  // ✅ CHANGE: Remove useDispatch
import * as coursesClient from "../../client";  // ✅ ADD client
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);  // ✅ Get from Redux
  
  const isNew = aid === "new";
  
  // ✅ State for assignment data
  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(),
    course: cid,
    title: "New Assignment",
    description: "The assignment is available online. Submit a link to your Web application.",
    points: 100,
    due: "2025-10-30",
    available: "2025-10-10",
    until: "2025-10-31",
  });
  
  // ✅ Load existing assignment if editing
  useEffect(() => {
    if (!isNew) {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [aid, assignments, isNew]);
  
  // ✅ Save logic with server calls
  const handleSave = async () => {
    try {
      if (isNew) {
        await coursesClient.createAssignment(cid as string, assignment);
      } else {
        await coursesClient.updateAssignment(assignment);
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-light">
          {isNew ? "New Assignment" : "Edit Assignment"}
        </Card.Header>
        
        <Card.Body>
          <Form>
            {/* Assignment Name */}
            <Form.Group className="mb-3" controlId="wd-name">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type="text"
                value={assignment.title}
                onChange={(e) =>
                  setAssignment({ ...assignment, title: e.target.value })
                }
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="wd-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={assignment.description}
                onChange={(e) =>
                  setAssignment({ ...assignment, description: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              {/* Points */}
              <Form.Group as={Col} controlId="wd-points">
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="number"
                  value={assignment.points}
                  onChange={(e) =>
                    setAssignment({ ...assignment, points: e.target.value })
                  }
                />
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
                <Form.Control
                  type="date"
                  value={assignment.due}
                  onChange={(e) =>
                    setAssignment({ ...assignment, due: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="wd-available-from">
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.available}
                  onChange={(e) =>
                    setAssignment({ ...assignment, available: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="wd-available-until">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.until}
                  onChange={(e) =>
                    setAssignment({ ...assignment, until: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Assignments`)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}