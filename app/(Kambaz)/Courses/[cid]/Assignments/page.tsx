"use client";
import Link from "next/link";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaGripVertical, FaRegFileAlt } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "next/navigation";
import * as db from "../../../Database";


export default function Assignments() {
  const { cid } = useParams();
  return (
    <div id="wd-assignments" className="p-3">
      {/* Search + Buttons */}
      <div className="clearfix mb-3">
        {/* Search bar */}
        <InputGroup className="w-25 float-start">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        {/* Buttons */}
        <div className="float-end">
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            + Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* ASSIGNMENTS Group */}
<ListGroup className="mb-4">
  <ListGroupItem className="bg-secondary p-3 fs-5">
    <FaGripVertical className="me-2" /> ASSIGNMENTS
    <span className="float-end">40% of Total</span>
  </ListGroupItem>

  {db.assignments
    .filter((a) => a.course === cid)
    .map((a) => (
      <ListGroupItem key={a._id} className="p-3 border-start border-success">
        <FaGripVertical className="me-2" />
        <FaRegFileAlt className="me-2 text-success" />
        <Link
          href={`/Courses/${cid}/Assignments/${a._id}`}
          className="fw-bold text-decoration-none"
        >
          {a.title}
        </Link>
        <GreenCheckmark />
        <div className="text-muted small ms-4">
          Due date TBD | 100 pts | Not Submitted
        </div>
      </ListGroupItem>
    ))}
</ListGroup>


      {/* ASSIGNMENTS Group
      <ListGroup className="mb-4">
        <ListGroupItem className="bg-secondary p-3 fs-5">
          <FaGripVertical className="me-2" /> ASSIGNMENTS
          <span className="float-end">40% of Total</span>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/123"
            className="fw-bold text-decoration-none"
          >
            A1 – ENV + HTML
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due May 13 at 11:59pm | 100 pts | Not Submitted
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/124"
            className="fw-bold text-decoration-none"
          >
            A2 – CSS + BOOTSTRAP
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due May 20 at 11:59pm | 100 pts | Not Submitted
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/125"
            className="fw-bold text-decoration-none"
          >
            A3 – JAVASCRIPT
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due May 27 at 11:59pm | 100 pts | Not Submitted
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/126"
            className="fw-bold text-decoration-none"
          >
            A4 – REACT + STATE
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jun 3 at 11:59pm | 100 pts | Not Submitted
          </div>
        </ListGroupItem>
      </ListGroup> */}

      {/* QUIZZES Group */}
      <ListGroup className="mb-4">
        <ListGroupItem className="bg-secondary p-3 fs-5">
          <FaGripVertical className="me-2" /> QUIZZES
          <span className="float-end">10% of Total</span>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/201"
            className="fw-bold text-decoration-none"
          >
            Q1 – HTML Basics
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jun 5 at 11:59pm | 20 pts
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/202"
            className="fw-bold text-decoration-none"
          >
            Q2 – CSS Basics
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jun 12 at 11:59pm | 20 pts
          </div>
        </ListGroupItem>
      </ListGroup>

      {/* EXAMS Group */}
      <ListGroup className="mb-4">
        <ListGroupItem className="bg-secondary p-3 fs-5">
          <FaGripVertical className="me-2" /> EXAMS
          <span className="float-end">30% of Total</span>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/301"
            className="fw-bold text-decoration-none"
          >
            Midterm Exam
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jun 15 at 11:59pm | 150 pts
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/302"
            className="fw-bold text-decoration-none"
          >
            Final Exam
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jul 1 at 11:59pm | 200 pts
          </div>
        </ListGroupItem>
      </ListGroup>

      {/* PROJECTS Group */}
      <ListGroup>
        <ListGroupItem className="bg-secondary p-3 fs-5">
          <FaGripVertical className="me-2" /> PROJECTS
          <span className="float-end">20% of Total</span>
        </ListGroupItem>

        <ListGroupItem className="p-3 border-start border-success">
          <FaGripVertical className="me-2" />
          <FaRegFileAlt className="me-2 text-success" />
          <Link
            href="/Courses/1234/Assignments/401"
            className="fw-bold text-decoration-none"
          >
            Final Project – Full Stack Web App
          </Link>
          <GreenCheckmark />
          <div className="text-muted small ms-4">
            Due Jul 10 at 11:59pm | 300 pts
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
