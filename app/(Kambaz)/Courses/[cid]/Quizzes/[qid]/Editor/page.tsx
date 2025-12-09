"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormCheck, FormSelect, Button, Nav, NavItem, NavLink } from "react-bootstrap";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [hasTimeLimit, setHasTimeLimit] = useState(false);

  const fetchQuiz = async () => {
    if (!qid) return;
    const quiz = await client.findQuizById(qid as string);
    setQuiz(quiz);
    // Check if quiz has time limit set
    if (quiz.timeLimit && quiz.timeLimit > 0) {
      setHasTimeLimit(true);
    }
  };

  const saveQuiz = async () => {
    if (!quiz) return;
    await client.updateQuiz(quiz._id, quiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const saveAndPublish = async () => {
    if (!quiz) return;
    const publishedQuiz = { ...quiz, published: true };
    await client.updateQuiz(quiz._id, publishedQuiz);
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-editor" className="p-3">
      <h2>Edit Quiz</h2>
      
      {/* Tabs */}
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink 
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ cursor: "pointer" }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink 
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            style={{ cursor: "pointer" }}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      {/* Details Tab */}
      {activeTab === "details" && (
        <Form>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <FormControl
              type="text"
              value={quiz.title || ""}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows={3}
              value={quiz.description || ""}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </Form.Group>

          {/* Quiz Type */}
          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <FormSelect
              value={quiz.quizType || "GRADED_QUIZ"}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </FormSelect>
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <FormControl
              type="number"
              value={quiz.points || 0}
              onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) || 0 })}
            />
          </Form.Group>

          {/* Assignment Group */}
          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <FormSelect
              value={quiz.assignmentGroup || "QUIZZES"}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </FormSelect>
          </Form.Group>

          <h5 className="mt-4">Options</h5>
          <hr />

          {/* Shuffle Answers */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers !== false}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
          </Form.Group>

          {/* ✅ FIXED: Time Limit with Checkbox + Input */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="Time Limit"
              checked={hasTimeLimit}
              onChange={(e) => {
                setHasTimeLimit(e.target.checked);
                if (!e.target.checked) {
                  setQuiz({ ...quiz, timeLimit: 0 });
                }
              }}
            />
            {hasTimeLimit && (
              <div className="mt-2 ms-4">
                <FormControl
                  type="number"
                  placeholder="Minutes"
                  value={quiz.timeLimit || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuiz({ ...quiz, timeLimit: value ? parseInt(value) : 0 });
                  }}
                  style={{ width: "150px" }}
                />
                <small className="text-muted"> Minutes</small>
              </div>
            )}
          </Form.Group>

          {/* Multiple Attempts */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts || false}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />
            {quiz.multipleAttempts && (
              <div className="mt-2 ms-4">
                <Form.Label>How Many Attempts</Form.Label>
                <FormControl
                  type="number"
                  value={quiz.howManyAttempts || 1}
                  onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) || 1 })}
                  style={{ width: "150px" }}
                />
              </div>
            )}
          </Form.Group>

          {/* Show Correct Answers */}
          <Form.Group className="mb-3">
            <Form.Label>Show Correct Answers</Form.Label>
            <FormSelect
              value={quiz.showCorrectAnswers || "Immediately"}
              onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
            >
              <option value="Immediately">Immediately</option>
              <option value="After Due Date">After Due Date</option>
              <option value="Never">Never</option>
            </FormSelect>
          </Form.Group>

          {/* Access Code */}
          <Form.Group className="mb-3">
            <Form.Label>Access Code (Optional)</Form.Label>
            <FormControl
              type="text"
              placeholder="Leave blank for no access code"
              value={quiz.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            />
          </Form.Group>

          {/* One Question at a Time */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime !== false}
              onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
            />
          </Form.Group>

          {/* Webcam Required */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired || false}
              onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
            />
          </Form.Group>

          {/* Lock Questions After Answering */}
          <Form.Group className="mb-3">
            <FormCheck
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering || false}
              onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
            />
          </Form.Group>

          <h5 className="mt-4">Dates</h5>
          <hr />

          {/* Due Date */}
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <FormControl
              type="date"
              value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().split('T')[0] : ""}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>

          {/* Available Date */}
          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <FormControl
              type="date"
              value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().split('T')[0] : ""}
              onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
            />
          </Form.Group>

          {/* Until Date */}
          <Form.Group className="mb-3">
            <Form.Label>Until</Form.Label>
            <FormControl
              type="date"
              value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().split('T')[0] : ""}
              onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
            />
          </Form.Group>

          {/* Action Buttons */}
          <div className="mt-4 d-flex justify-content-end">
            <Button variant="secondary" onClick={cancel} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" onClick={saveQuiz} className="me-2">
              Save
            </Button>
            <Button variant="success" onClick={saveAndPublish}>
              Save & Publish
            </Button>
          </div>
        </Form>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div>
          <h4>Questions</h4>
          <p className="text-muted">Questions editor will be implemented next...</p>
          <Button variant="danger" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`)}>
            + New Question
          </Button>
        </div>
      )}
    </div>
  );
}