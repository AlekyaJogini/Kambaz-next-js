"use client";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  // Fetch the assignment object when component loads
  const fetchAssignment = async () => {
    const fetchedAssignment = await client.fetchAssignment();
    setAssignment(fetchedAssignment);
  };

  // Update the title on the server
  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  // Load assignment data once when component mounts
  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects" className="mb-4">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      {/* Title */}
      <FormControl
        className="mb-2"
        value={assignment.title || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      {/* Description */}
      <FormControl
        className="mb-2"
        rows={3}
        as="textarea"
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      {/* Due Date */}
      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />

      {/* Completed toggle */}
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      {/* Button to update title */}
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>

      {/* JSON output for debugging */}
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
