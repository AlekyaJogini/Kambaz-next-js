"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();

  // function to check if the current link is active
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/Courses/1234/Home"
        id="wd-course-home-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Home") ? "text-black" : "text-danger"
        }`}
      >
        Home
      </Link>
      <Link
        href="/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Modules") ? "text-black" : "text-danger"
        }`}
      >
        Modules
      </Link>
      <Link
        href="/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Piazza") ? "text-black" : "text-danger"
        }`}
      >
        Piazza
      </Link>
      <Link
        href="/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Zoom") ? "text-black" : "text-danger"
        }`}
      >
        Zoom

        


      </Link>
      <Link
        href="/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Assignments") ? "text-black" : "text-danger"
        }`}
        
      >
        Assignments
      </Link>
      <Link
        href="/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Quizzes") ? "text-black" : "text-danger"
        }`}
      >
        Quizzes


        </Link>
      <Link
        href="/Courses/1234/Grades"
        id="wd-course-grades-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Grades") ? "text-black" : "text-danger"
        }`}
        
      >
        Grades
      </Link>
      <Link
        href="/Courses/1234/People/Table"
        id="wd-course-people-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/People") ? "text-black" : "text-danger"
        }`}
      >
        People
      </Link>
    </div>
  );
}
