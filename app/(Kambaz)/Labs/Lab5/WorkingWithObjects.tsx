"use client";
import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "CS5610",
    name: "Web Development",
    description: "Full Stack Development using React and Node.js",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* ---- Update Assignment Title ---- */}
      <h4>Update Assignment Title</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>

      {/* ---- Update Assignment Score ---- */}
      <h4>Update Score</h4>
      <FormControl
        className="w-50 mb-2"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        className="btn btn-success mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>

      {/* ---- Update Completed ---- */}
      <h4>Update Completed</h4>
      <FormCheck
        type="checkbox"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <a
        className="btn btn-warning mb-3"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <hr />

      {/* ---- Module Section ---- */}
      <h3>Module Object</h3>
      <a className="btn btn-primary mb-2" href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <a className="btn btn-info mb-2 ms-2" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      {/* ---- Update Module Name ---- */}
      <h4>Update Module Name</h4>
      <FormControl
        className="w-75 mb-2"
        defaultValue={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />
      <a
        className="btn btn-success"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>

      {/* ---- Update Module Description ---- */}
      <h4 className="mt-4">Update Module Description</h4>
      <FormControl
        className="w-75 mb-2"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />
      <a
        className="btn btn-danger"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}