"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as client from "./client";
import Link from "next/link";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await client.findQuizzesForCourse(cid as string);
    // ✅ Sort by available date (rubric requirement!)
    const sortedQuizzes = quizzes.sort((a: any, b: any) => {
      const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
      const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
      return dateA - dateB;
    });
    setQuizzes(sortedQuizzes);
  };

  const createQuiz = async () => {
    if (!cid) return;
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      description: "New Description",
      availableDate: new Date(),  // ✅ Set available date
    });
    setQuizzes([...quizzes, newQuiz]);
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/Editor`);
  };

  const deleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };

  const togglePublish = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(quiz._id, updatedQuiz);
    setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q)));
  };

  const copyQuiz = async (quiz: any) => {
    if (!cid) return;
    const copiedQuiz = {
      ...quiz,
      title: `${quiz.title} - Copy`,
      published: false,
    };
    delete copiedQuiz._id;  // Remove ID so server creates new one
    const newQuiz = await client.createQuiz(cid as string, copiedQuiz);
    setQuizzes([...quizzes, newQuiz]);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        <Button variant="danger" onClick={createQuiz}>
          <FaPlus className="me-2" />
          Quiz
        </Button>
      </div>

      {quizzes.length === 0 && (
        <div className="alert alert-info">
          No quizzes yet. Click the + Quiz button to create one.
        </div>
      )}

      <ListGroup>
        {quizzes.map((quiz) => (
          <ListGroupItem 
            key={quiz._id} 
            className="d-flex justify-content-between align-items-center"
          >
            {/* Published/Unpublished Icon */}
            <div style={{ cursor: "pointer" }} onClick={() => togglePublish(quiz)}>
              {quiz.published ? (
                <FaCheckCircle className="text-success fs-5" />
              ) : (
                <MdDoNotDisturbAlt className="text-danger fs-5" />
              )}
            </div>

            {/* Quiz Info */}
            <div className="flex-fill ms-3">
              <Link 
                href={`/Courses/${cid}/Quizzes/${quiz._id}`} 
                className="text-decoration-none text-dark fw-bold"
              >
                {quiz.title}
              </Link>
              <div className="text-muted small">
                <span>
                  {quiz.availableDate && quiz.untilDate 
                    ? `Available: ${new Date(quiz.availableDate).toLocaleDateString()} - ${new Date(quiz.untilDate).toLocaleDateString()}`
                    : "Not available yet"}
                </span>
                {" | "}
                <span>Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "No due date"}</span>
                {" | "}
                <span>{quiz.points || 0} pts</span>
                {" | "}
                <span>{quiz.questions?.length || 0} questions</span>
              </div>
            </div>

            {/* ✅ 3-Dot Context Menu */}
            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-dark p-0">
                <BsThreeDotsVertical className="fs-4" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteQuiz(quiz._id)} className="text-danger">
                  Delete
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => togglePublish(quiz)}>
                  {quiz.published ? "Unpublish" : "Publish"}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => copyQuiz(quiz)}>
                  Copy
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}