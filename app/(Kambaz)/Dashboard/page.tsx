/* eslint-disable react/jsx-key */
import Link from "next/link";
import * as db from "../Database"
import Image from "next/image";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
   
   const courses = db.courses;
   
  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">

        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
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
//           {courses.map((course) => (
          
          

//           {/* Course 2 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/2345/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/nodejs.jpg"
//                   height={160}
//                   alt="Node.js"
//                 />
//                 <CardBody>
//                   <CardTitle>CS2345 Node.js</CardTitle>
//                   <CardText>Backend Development</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>

//           {/* Course 3 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/3456/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/mongodb.jpg"
//                   height={160}
//                   alt="MongoDB"
//                 />
//                 <CardBody>
//                   <CardTitle>CS3456 MongoDB</CardTitle>
//                   <CardText>NoSQL Database Systems</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>

//           {/* Course 4 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/4567/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/nextjs.jpg"
//                   height={160}
//                   alt="Next.js"
//                 />
//                 <CardBody>
//                   <CardTitle>CS4567 Next.js</CardTitle>
//                   <CardText>Server-Side Rendering</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>

//           {/* Course 5 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5678/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/html.jpg"
//                   height={160}
//                   alt="HTML"
//                 />
//                 <CardBody>
//                   <CardTitle>CS5678 HTML </CardTitle>
//                   <CardText>Web Foundations</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>

//           {/* Course 6 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/6789/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/css.jpg"
//                   height={160}
//                   alt="CSS"
//                 />
//                 <CardBody>
//                   <CardTitle>CS6789 CSS & Styling</CardTitle>
//                   <CardText>Frontend Design</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>

//           {/* Course 7 */}
//           <Col style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/7890/Home" className="text-decoration-none text-dark">
//                 <CardImg
//                   variant="top"
//                   src="/images/javascript.jpg"
//                   height={160}
//                   alt="JavaScript"
//                 />
//                 <CardBody>
//                   <CardTitle>CS7890 JavaScript</CardTitle>
//                   <CardText>Interactive Web Programming</CardText>
//                   <Button variant="primary">Go</Button>
//                 </CardBody>
//               </Link>
//             </Card>
//           </Col>
        
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// }
