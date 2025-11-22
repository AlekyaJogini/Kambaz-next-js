"use client";
import * as client from "../Courses/[cid]/client";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const [enrolling, setEnrolling] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: uuidv4(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      const enrolledCourses = await client.findMyCourses();
      
      const coursesWithEnrollment = allCourses.map((course: any) => ({
        ...course,
        enrolled: enrolledCourses.some((c: any) => c._id === course._id)
      }));
      
      dispatch(setCourses(coursesWithEnrollment));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnrollment = async (courseId: string, isEnrolled: boolean) => {
    try {
      if (isEnrolled) {
        await client.unenrollFromCourse("current", courseId);
      } else {
        await client.enrollInCourse("current", courseId);
      }
      
      if (enrolling) {
        fetchAllCourses();
      } else {
        fetchCourses();
      }
    } catch (error) {
      console.error("Enrollment error:", error);
    }
  };

  const addNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setCourse({
        _id: uuidv4(),
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const deleteCourseHandler = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // ✅ ADD: Update course handler
  const updateCourseHandler = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) { 
            return course; 
          } else { 
            return c; 
          }
        })
      ));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      if (enrolling) {
        fetchAllCourses();
      } else {
        fetchCourses();
      }
    } else {
      fetchCourses();
    }
  }, [currentUser, enrolling]);

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">
        Dashboard
        {currentUser?.role === "STUDENT" && (
          <button 
            onClick={() => setEnrolling(!enrolling)}
            className="btn btn-primary float-end"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}  
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={updateCourseHandler} 
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "My Courses"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>

                    <Button variant="primary">Go</Button>

                    {currentUser?.role === "STUDENT" && !enrolling && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnrollment(course._id, true);
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                    )}

                    {currentUser?.role === "STUDENT" && enrolling && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnrollment(course._id, course.enrolled);
                        }}
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}

                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourseHandler(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);  {/* ✅ This loads course into form for editing */}
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}