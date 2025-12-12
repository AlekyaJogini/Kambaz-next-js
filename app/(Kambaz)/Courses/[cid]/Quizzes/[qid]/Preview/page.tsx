"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormCheck, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // State
  const [quiz, setQuiz] = useState<any>(null);
  const [stage, setStage] = useState<"instruction" | "taking" | "results">("instruction");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";
  const canRetake = quiz?.multipleAttempts && attemptCount < (quiz?.howManyAttempts || 1);

  // Fetch quiz and check attempt status
  const fetchQuizData = async () => {
    try {
      if (!qid) return;
      const fetchedQuiz = await client.findQuizById(qid as string);
      setQuiz(fetchedQuiz);
      
      // Calculate total points
      const total = (fetchedQuiz.questions || []).reduce(
        (sum: number, q: any) => sum + (q.points || 0),
        0
      );
      setTotalPoints(total);

      // For students: check attempt count and fetch last attempt
      if (!isFaculty) {
        const count = await client.getAttemptCount(qid as string, currentUser?._id);
        setAttemptCount(count);

        if (count > 0) {
          const last = await client.getLastAttempt(qid as string, currentUser?._id);
          if (last) {
            const lastAnswers: any = {};
            (last.answers || []).forEach((a: any) => {
              lastAnswers[a.questionIndex] = a.selectedAnswer;
            });
            setAnswers(lastAnswers);
            setScore(last.score);
            setStage("results");
          }
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setLoading(false);
    }
  };

  // Score calculation logic
  const calculateScore = (studentAnswers: any) => {
    let points = 0;

    (quiz?.questions || []).forEach((question: any, index: number) => {
      const studentAnswer = studentAnswers[index];
      let isCorrect = false;

      if (question.type === "MULTIPLE_CHOICE") {
        isCorrect = studentAnswer === question.correctAnswer;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = studentAnswer === question.correctAnswer;
      } else if (question.type === "FILL_IN_BLANK") {
        const normalizedStudentAnswer = studentAnswer?.toLowerCase().trim() || "";
        isCorrect = (question.possibleAnswers || []).some(
          (answer: string) => answer.toLowerCase().trim() === normalizedStudentAnswer
        );
      }

      if (isCorrect) {
        points += question.points || 0;
      }
    });

    return points;
  };

  // Check if answer is correct
  const checkAnswer = (question: any, studentAnswer: any) => {
    if (question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") {
      return studentAnswer === question.correctAnswer;
    } else if (question.type === "FILL_IN_BLANK") {
      const normalizedStudent = studentAnswer?.toLowerCase().trim() || "";
      return (question.possibleAnswers || []).some(
        (answer: string) => answer.toLowerCase().trim() === normalizedStudent
      );
    }
    return false;
  };

  // Submit quiz
  const submitQuiz = async () => {
    const calculatedScore = calculateScore(answers);
    setScore(calculatedScore);
    setStage("results");

    // For students: save attempt to database
    if (!isFaculty) {
      const attempt = {
        studentId: currentUser?._id,
        quizId: qid,
        courseId: cid,
        answers: (quiz?.questions || []).map((question: any, index: number) => ({
          questionIndex: index,
          questionId: question._id,
          questionType: question.type,
          selectedAnswer: answers[index],
          correctAnswer: question.correctAnswer,
          isCorrect: checkAnswer(question, answers[index]),
          pointsEarned: checkAnswer(question, answers[index]) ? question.points || 0 : 0,
        })),
        score: calculatedScore,
        totalPoints: totalPoints,
        attemptNumber: attemptCount + 1,
      };

      await client.saveAttempt(attempt);
      setAttemptCount(attemptCount + 1);
    }
  };

  // Retake quiz
  const retakeQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStage("taking");
  };

  // Back to details
  const backToDetails = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  // Go to editor
  const backToEditor = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`);
  };

  useEffect(() => {
    fetchQuizData();
  }, [qid]);

  if (loading) return <div className="p-3">Loading...</div>;
  if (!quiz) return <div className="alert alert-danger m-3">Quiz not found</div>;

  // ========== INSTRUCTION STAGE ==========
  if (stage === "instruction") {
    return (
      <div className="p-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Alert variant="info">
          This is a preview of the published version of the quiz
        </Alert>

        <h3 className="mb-4">Quiz Instructions</h3>
        
        <div className="card p-4 mb-4">
          <h5 className="mb-3">{quiz.title}</h5>
          <p>{quiz.description || "No description provided"}</p>
          
          <hr />
          
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold" style={{ width: "200px" }}>Points</td>
                <td>{totalPoints}</td>
              </tr>
              <tr>
                <td className="fw-bold">Questions</td>
                <td>{quiz.questions?.length || 0}</td>
              </tr>
              {quiz.timeLimit && quiz.timeLimit > 0 && (
                <tr>
                  <td className="fw-bold">Time Limit</td>
                  <td>{quiz.timeLimit} minutes</td>
                </tr>
              )}
            </tbody>
          </table>

          <hr className="my-3" />

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={backToDetails}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setStage("taking")}>
              {isFaculty ? "Preview Quiz" : "Start Quiz"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ========== TAKING STAGE ==========
  if (stage === "taking") {
    const currentQuestion = quiz.questions?.[currentQuestionIndex];
    const totalQuestions = quiz.questions?.length || 0;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
      <div className="p-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Alert variant="info">
          This is a preview of the published version of the quiz
        </Alert>

        <h4 className="mb-4">Started: {new Date().toLocaleString()}</h4>

        {/* Question Display */}
        {currentQuestion && (
          <div className="card p-4 mb-4">
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                Question {currentQuestionIndex + 1}{" "}
                <span className="float-end">{currentQuestion.points || 0} pts</span>
              </h6>
              <p className="fs-5 mb-4">{currentQuestion.question}</p>
            </div>

            {/* Answer Options */}
            <Form>
              {/* MULTIPLE CHOICE */}
              {currentQuestion.type === "MULTIPLE_CHOICE" && (
                <div className="mb-4">
                  {(currentQuestion.choices || []).map((choice: string, cIndex: number) => (
                    <FormCheck
                      key={cIndex}
                      type="radio"
                      id={`q${currentQuestionIndex}c${cIndex}`}
                      name={`question-${currentQuestionIndex}`}
                      label={choice}
                      value={choice}
                      checked={answers[currentQuestionIndex] === choice}
                      onChange={(e) =>
                        setAnswers({ ...answers, [currentQuestionIndex]: e.target.value })
                      }
                      className="mb-2"
                    />
                  ))}
                </div>
              )}

              {/* TRUE FALSE */}
              {currentQuestion.type === "TRUE_FALSE" && (
                <div className="mb-4">
                  <FormCheck
                    type="radio"
                    id={`q${currentQuestionIndex}true`}
                    name={`question-${currentQuestionIndex}`}
                    label="True"
                    value="True"
                    checked={answers[currentQuestionIndex] === "True"}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQuestionIndex]: e.target.value })
                    }
                    className="mb-2"
                  />
                  <FormCheck
                    type="radio"
                    id={`q${currentQuestionIndex}false`}
                    name={`question-${currentQuestionIndex}`}
                    label="False"
                    value="False"
                    checked={answers[currentQuestionIndex] === "False"}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQuestionIndex]: e.target.value })
                    }
                    className="mb-2"
                  />
                </div>
              )}

              {/* FILL IN BLANK */}
              {currentQuestion.type === "FILL_IN_BLANK" && (
                <div className="mb-4">
                  <FormControl
                    type="text"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestionIndex] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQuestionIndex]: e.target.value })
                    }
                  />
                </div>
              )}
            </Form>

            {/* Navigation */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {!isLastQuestion && (
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  >
                    Next →
                  </Button>
                )}
              </div>
              <Button variant="danger" onClick={submitQuiz}>
                Submit Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Keep Editing This Quiz - Faculty Only */}
        {isFaculty && (
          <div className="mb-4">
            <a 
              href="#" 
              className="text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                backToEditor();
              }}
            >
              Keep Editing This Quiz
            </a>
          </div>
        )}

        {/* Questions List */}
        <div>
          <h6 className="fw-bold mb-3">Questions</h6>
          <div className="d-flex flex-wrap gap-2">
            {(quiz.questions || []).map((question: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`btn ${
                  currentQuestionIndex === index ? "btn-primary" : "btn-outline-danger"
                } btn-sm`}
              >
                Question {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========== RESULTS STAGE ==========
  if (stage === "results") {
    return (
      <div className="p-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Alert variant="success">
          <div>
            <h5>Quiz saved at {new Date().toLocaleString()}</h5>
            <p className="mb-0">
              Score: <strong>{score} / {totalPoints} points</strong> ({((score / totalPoints) * 100).toFixed(1)}%)
            </p>
          </div>
        </Alert>

        <h4 className="mb-4">Results</h4>

        {/* Results for each question */}
        <div>
          {(quiz.questions || []).map((question: any, index: number) => {
            const studentAnswer = answers[index];
            const isCorrect = checkAnswer(question, studentAnswer);

            return (
              <div
                key={index}
                className="card mb-3 p-4"
                style={{
                  borderLeft: `5px solid ${isCorrect ? "#28a745" : "#dc3545"}`,
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1">
                      Question {index + 1}{" "}
                      <span className="text-muted">({question.points || 0} pts)</span>
                    </h6>
                    <p className="mb-0">{question.question}</p>
                  </div>
                  <div>
                    {isCorrect ? (
                      <span className="badge bg-success fs-6">✓</span>
                    ) : (
                      <span className="badge bg-danger fs-6">✗</span>
                    )}
                  </div>
                </div>

                <hr className="my-2" />

                {question.type === "MULTIPLE_CHOICE" && (
                  <div className="small">
                    <p className="mb-1">
                      <strong>Your answer:</strong> {studentAnswer || "Not answered"}
                    </p>
                    <p className="mb-0">
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </p>
                  </div>
                )}

                {question.type === "TRUE_FALSE" && (
                  <div className="small">
                    <p className="mb-1">
                      <strong>Your answer:</strong> {studentAnswer || "Not answered"}
                    </p>
                    <p className="mb-0">
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </p>
                  </div>
                )}

                {question.type === "FILL_IN_BLANK" && (
                  <div className="small">
                    <p className="mb-1">
                      <strong>Your answer:</strong> {studentAnswer || "Not answered"}
                    </p>
                    <p className="mb-0">
                      <strong>Correct answers:</strong>{" "}
                      {(question.possibleAnswers || []).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons - Faculty vs Student */}
        <div className="d-flex gap-2 mt-4">
          <Button variant="secondary" onClick={backToDetails}>
            Back
          </Button>
          {isFaculty && (
            <Button variant="primary" onClick={backToEditor}>
              Edit Quiz
            </Button>
          )}
          {!isFaculty && canRetake && (
            <Button variant="primary" onClick={retakeQuiz}>
              Retake Quiz
            </Button>
          )}
        </div>
      </div>
    );
  }
}