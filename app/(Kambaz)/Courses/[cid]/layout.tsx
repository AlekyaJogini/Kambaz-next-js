import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
  <div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      Course 1234 </h2> <hr />
      <div className="d-flex">
    <div className="d-none d-md-block">

   <CourseNavigation /> 
   </div>
    <div className="flex-fill"> {children} 
    </div></div>
    </div>         
);}
