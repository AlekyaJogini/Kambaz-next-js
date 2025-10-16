import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import {courses} from "../../Database";
import Breadcrumb from "./Breadcrumb";
export default function KambazLayout({ children, params }: { children: ReactNode; params: Record<string, unknown> }) {

  const { cid } = params as { cid: string };
  const course = courses.find((course) => course._id === cid);


 return (
  <div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      <Breadcrumb course={course} />
       </h2> <hr />
      <div className="d-flex">
    <div className="d-none d-md-block">

   <CourseNavigation /> 
   </div>
    <div className="flex-fill"> {children} 
    </div></div>
    </div>         
);}
