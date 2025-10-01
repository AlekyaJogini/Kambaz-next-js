import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaChartBar } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome, AiOutlineBell } from "react-icons/ai";
import { FaStream } from "react-icons/fa";
import { IoMegaphoneOutline } from "react-icons/io5";


export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>

      {/* Unpublish / Publish */}
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-unpublish-btn"
          >
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button
            variant="success"
            size="lg"
            className="w-100"
            id="wd-publish-btn"
          >
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      <br />

      {/* Rest of the buttons */}
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-existing-btn"
      >
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-commons-btn"
      >
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-choose-home-btn"
      >
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-course-stream-btn"
      >
        <FaStream className="me-2 fs-5" /> View Course Stream
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-announcement-btn"
      >
        <IoMegaphoneOutline className="me-2 fs-5" /> New Announcement
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-analytics-btn"
      >
        <FaChartBar className="me-2 fs-5" /> New Analytics
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-notifications-btn"
      >
        <AiOutlineBell className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
