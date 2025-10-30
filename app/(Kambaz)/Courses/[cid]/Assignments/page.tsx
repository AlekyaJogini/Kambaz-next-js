"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
InputGroup,
FormControl,
Button,
ListGroup,
ListGroupItem,
} from "react-bootstrap";
import {
FaSearch,
FaPlus,
FaGripVertical,
FaRegFileAlt,
FaTrash,
} from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function Assignments() {
const dispatch = useDispatch();
const router = useRouter();
const { cid } = useParams();
// ✅ Read assignments from Redux store
const assignments = useSelector((state: any) => state.assignmentReducer);
// ✅ Delete handler
const handleDelete = (id: string) => {
const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
if (confirmDelete) {
dispatch(deleteAssignment(id));
}
};
return (
<div id="wd-assignments" className="p-3">
{/* Search + Buttons */}
<div className="clearfix mb-3">
<InputGroup className="w-25 float-start">
<InputGroup.Text>
<FaSearch />
</InputGroup.Text>
<FormControl placeholder="Search for Assignments" id="wd-search-assignment" />
</InputGroup>
    <div className="float-end">
      <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
        + Group
      </Button>
      <Link href={`/Courses/${cid}/Assignments/new`}>
        <Button variant="danger" size="lg" id="wd-add-assignment">
          <FaPlus className="me-1" /> Assignment
        </Button>
      </Link>
    </div>
  </div>

  {/* ASSIGNMENTS Group */}
  <ListGroup className="mb-4 wd-lesson">
    <ListGroupItem className="bg-secondary p-3 fs-5">
      <FaGripVertical className="me-2" /> ASSIGNMENTS
      <span className="float-end">40% of Total</span>
    </ListGroupItem>

    {assignments
      .filter((a: any) => a.course === cid)
      .map((a: any) => (
        <ListGroupItem
          key={a._id}
          className="p-3 border-start border-success d-flex justify-content-between align-items-center"
        >
          <div>
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
              Due date TBD | {a.points || 100} pts | Not Submitted
            </div>
          </div>

          {/* ✅ Trash icon for delete */}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(a._id)}
            title="Delete assignment"
          >
            <FaTrash />
          </Button>
        </ListGroupItem>
      ))}
  </ListGroup>
</div>
);
}