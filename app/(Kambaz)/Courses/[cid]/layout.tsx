import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import {courses} from "../../Database";
import Breadcrumb from "./Breadcrumb";
export default async function KambazLayout(props: unknown) {
  const { children, params } = props as { children: ReactNode; params: { cid: string } };
  // `params` may be a Promise in some Next setups, so await it to get the real values
  const resolvedParams = await params;
  const { cid } = resolvedParams as { cid: string };
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
