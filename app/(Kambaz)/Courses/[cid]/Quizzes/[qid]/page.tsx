"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuiz = async () => {
    if (!qid) return;
    const quiz = await client.findQuizById(qid as string);
    setQuiz(quiz);
  };

  const togglePublish = async () => {
    if (!quiz) return;
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(quiz._id, updatedQuiz);
    setQuiz(updatedQuiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-quiz-details" className="p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        
        {/* Faculty Buttons */}
        {isFaculty && (
          <div>
            <Button 
              variant={quiz.published ? "secondary" : "success"} 
              onClick={togglePublish}
              className="me-2"
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}
              className="me-2"
            >
              Preview
            </Button>
            <Button 
              variant="primary" 
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`)}
            >
              Edit
            </Button>
          </div>
        )}
        
        {/* Student Button */}
        {!isFaculty && quiz.published && (
          <Button 
            variant="danger" 
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* Quiz Properties Table */}
      <div className="border p-4 bg-light">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="fw-bold" style={{ width: "30%" }}>Quiz Type</td>
              <td>{quiz.quizType || "Graded Quiz"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Points</td>
              <td>{quiz.points || 0}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Assignment Group</td>
              <td>{quiz.assignmentGroup || "Quizzes"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Time Limit</td>
              <td>{quiz.timeLimit || 20} Minutes</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Multiple Attempts</td>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            
            {quiz.multipleAttempts && (
              <tr>
                <td className="fw-bold">How Many Attempts</td>
                <td>{quiz.howManyAttempts || 1}</td>
              </tr>
            )}
            
            <tr>
              <td className="fw-bold">Show Correct Answers</td>
              <td>{quiz.showCorrectAnswers || "Immediately"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Access Code</td>
              <td>{quiz.accessCode || "None"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">One Question at a Time</td>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Lock Questions After Answering</td>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
        
        <hr />
        
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="fw-bold" style={{ width: "30%" }}>Due</td>
              <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "No due date"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Available from</td>
              <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "N/A"}</td>
            </tr>
            
            <tr>
              <td className="fw-bold">Until</td>
              <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}