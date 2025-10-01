import Link from "next/link";
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
  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
         {/* Course 1 */}
<Col style={{ width: "300px" }}>
  <Card>
    <Link
      href="/Courses/1234/Home"
      className="text-decoration-none text-dark"
    >
      <CardImg
        variant="top"
        src="/images/reactjs.jpg"
        height={160}
        alt="ReactJS"
      />
      <CardBody>
        <CardTitle>CS1234 ReactJS</CardTitle>
        <CardText>Full Stack Software Developer</CardText>
        <Button variant="primary">Go</Button>
      </CardBody>
    </Link>
  </Card>
</Col>

          {/* Course 2 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/2345/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/nodejs.jpg"
                  height={160}
                  alt="Node.js"
                />
                <CardBody>
                  <CardTitle>CS2345 Node.js</CardTitle>
                  <CardText>Backend Development</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 3 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/3456/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/mongodb.jpg"
                  height={160}
                  alt="MongoDB"
                />
                <CardBody>
                  <CardTitle>CS3456 MongoDB</CardTitle>
                  <CardText>NoSQL Database Systems</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 4 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/4567/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/nextjs.jpg"
                  height={160}
                  alt="Next.js"
                />
                <CardBody>
                  <CardTitle>CS4567 Next.js</CardTitle>
                  <CardText>Server-Side Rendering</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 5 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/5678/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/html.jpg"
                  height={160}
                  alt="HTML"
                />
                <CardBody>
                  <CardTitle>CS5678 HTML </CardTitle>
                  <CardText>Web Foundations</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 6 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/6789/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/css.jpg"
                  height={160}
                  alt="CSS"
                />
                <CardBody>
                  <CardTitle>CS6789 CSS & Styling</CardTitle>
                  <CardText>Frontend Design</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 7 */}
          <Col style={{ width: "300px" }}>
            <Card>
              <Link href="/Courses/7890/Home" className="text-decoration-none text-dark">
                <CardImg
                  variant="top"
                  src="/images/javascript.jpg"
                  height={160}
                  alt="JavaScript"
                />
                <CardBody>
                  <CardTitle>CS7890 JavaScript</CardTitle>
                  <CardText>Interactive Web Programming</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
