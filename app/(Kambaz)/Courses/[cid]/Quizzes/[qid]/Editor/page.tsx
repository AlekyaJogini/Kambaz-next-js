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
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [originalQuestion, setOriginalQuestion] = useState<any>(null);

  const fetchQuiz = async () => {
    if (!qid) return;
    const quiz = await client.findQuizById(qid as string);
    setQuiz(quiz);
    // Check if quiz has time limit set
    if (quiz.timeLimit && quiz.timeLimit > 0) {
      setHasTimeLimit(true);
    }
  };

  // Calculate total points from all questions
  const calculateTotalPoints = () => {
    return (quiz.questions || []).reduce((sum: number, q: any) => sum + (q.points || 0), 0);
  };

  // Save quiz with calculated points
  const saveQuiz = async () => {
    if (!quiz) return;
    const updatedQuiz = { 
      ...quiz, 
      points: calculateTotalPoints()
    };
    await client.updateQuiz(updatedQuiz._id, updatedQuiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  // Save and publish with calculated points
  const saveAndPublish = async () => {
    if (!quiz) return;
    const updatedQuiz = { 
      ...quiz, 
      points: calculateTotalPoints(),
      published: true 
    };
    await client.updateQuiz(updatedQuiz._id, updatedQuiz);
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  // ========== QUESTIONS TAB FUNCTIONS ==========

  const addQuestion = () => {
    const newQuestion = {
      _id: `q-${Date.now()}`,
      type: "MULTIPLE_CHOICE",
      question: "",
      points: 0,
      choices: ["", ""],
      correctAnswer: "",
      possibleAnswers: [],
    };
    const updatedQuestions = [...(quiz.questions || []), newQuestion];
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingQuestionIndex((quiz.questions || []).length);
  };

  const updateQuestion = (index: number, updates: any) => {
    const updatedQuestions = [...(quiz.questions || [])];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updates };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const updateChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    const updatedQuestions = [...(quiz.questions || [])];
    const choices = [...(updatedQuestions[questionIndex].choices || [])];
    choices[choiceIndex] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], choices };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addChoice = (questionIndex: number) => {
    const updatedQuestions = [...(quiz.questions || [])];
    const choices = updatedQuestions[questionIndex].choices || [];
    choices.push("");
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], choices };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeChoice = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestions = [...(quiz.questions || [])];
    const choices = updatedQuestions[questionIndex].choices || [];
    choices.splice(choiceIndex, 1);
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], choices };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = (quiz.questions || []).filter((_: any, i: number) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingQuestionIndex(null);
  };

  const saveQuestion = (index: number) => {
    setEditingQuestionIndex(null);
    setOriginalQuestion(null);
  };

  const cancelEdit = () => {
    if (originalQuestion !== null && editingQuestionIndex !== null) {
      const updatedQuestions = [...(quiz.questions || [])];
      updatedQuestions[editingQuestionIndex] = originalQuestion;
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
    setEditingQuestionIndex(null);
    setOriginalQuestion(null);
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

          {/* Points - FIXED: Now shows calculated value */}
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <FormControl
              type="number"
              value={calculateTotalPoints()}
              disabled
              className="bg-light"
            />
            <small className="text-muted">Auto-calculated from total question points</small>
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

          {/* Time Limit with Checkbox + Input */}
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

          {/* DUE DATE */}
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <FormControl
              type="date"
              value={quiz.dueDate ? quiz.dueDate.substring(0, 10) : ""}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>

          {/* AVAILABLE DATE */}
          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <FormControl
              type="date"
              value={quiz.availableDate ? quiz.availableDate.substring(0, 10) : ""}
              onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
            />
          </Form.Group>

          {/* UNTIL DATE */}
          <Form.Group className="mb-3">
            <Form.Label>Until</Form.Label>
            <FormControl
              type="date"
              value={quiz.untilDate ? quiz.untilDate.substring(0, 10) : ""}
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Questions</h4>
            <div>
              <small className="text-muted me-3">
                Total Points: <strong>{calculateTotalPoints()}</strong>
              </small>
              <Button 
                variant="danger" 
                onClick={addQuestion}
                className="ms-2"
              >
                + New Question
              </Button>
            </div>
          </div>

          {quiz.questions && quiz.questions.length === 0 ? (
            <div className="alert alert-info">
              No questions yet. Click + New Question to add one.
            </div>
          ) : (
            <div className="questions-list">
              {quiz.questions?.map((question: any, index: number) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    {editingQuestionIndex === index ? (
                      // EDIT MODE
                      <div>
                        <h5 className="mb-3">Edit Question</h5>
                        
                        {/* Question Type Dropdown */}
                        <Form.Group className="mb-3">
                          <Form.Label>Question Type</Form.Label>
                          <FormSelect
                            value={question.type || "MULTIPLE_CHOICE"}
                            onChange={(e) => updateQuestion(index, { type: e.target.value })}
                          >
                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                            <option value="TRUE_FALSE">True/False</option>
                            <option value="FILL_IN_BLANK">Fill in the Blank</option>
                          </FormSelect>
                        </Form.Group>

                        {/* Question Title */}
                        <Form.Group className="mb-3">
                          <Form.Label>Question Title</Form.Label>
                          <FormControl
                            type="text"
                            value={question.title || ""}
                            onChange={(e) => updateQuestion(index, { title: e.target.value })}
                            placeholder="Enter question title"
                          />
                        </Form.Group>

                        {/* Question Text */}
                        <Form.Group className="mb-3">
                          <Form.Label>Question Text</Form.Label>
                          <FormControl
                            as="textarea"
                            rows={2}
                            value={question.question || ""}
                            onChange={(e) => updateQuestion(index, { question: e.target.value })}
                            placeholder="Enter your question"
                          />
                        </Form.Group>

                       {/* Points */}
<Form.Group className="mb-3">
  <Form.Label>Points</Form.Label>
  <FormControl
    type="number"
    value={question.points || ""}
    onChange={(e) => {
      const value = e.target.value;
      const numValue = value === "" ? 0 : Number(value);
      updateQuestion(index, { points: numValue });
    }}
    placeholder="0"
    min="0"
  />
</Form.Group>

                        {/* Multiple Choice Questions */}
                        {question.type === "MULTIPLE_CHOICE" && (
                          <div className="mb-3">
                            <Form.Label>Answer Choices</Form.Label>
                            {(question.choices || []).map((choice: string, choiceIndex: number) => (
                              <div key={choiceIndex} className="mb-2 d-flex gap-2">
                                <FormControl
                                  value={choice}
                                  onChange={(e) => updateChoice(index, choiceIndex, e.target.value)}
                                  placeholder={`Choice ${choiceIndex + 1}`}
                                />
                                <FormCheck
                                  type="radio"
                                  name={`correct-${index}`}
                                  checked={question.correctAnswer === choice}
                                  onChange={() => updateQuestion(index, { correctAnswer: choice })}
                                  label="Correct"
                                  className="mt-2"
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => removeChoice(index, choiceIndex)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => addChoice(index)}
                              className="mt-2"
                            >
                              + Add Choice
                            </Button>
                          </div>
                        )}

                        {/* True/False Questions */}
                        {question.type === "TRUE_FALSE" && (
                          <div className="mb-3">
                            <Form.Label className="fw-bold mb-3 d-block">Correct Answer</Form.Label>
                            <div className="d-flex gap-4">
                              <FormCheck
                                type="radio"
                                id={`true-${index}`}
                                name={`correct-${index}`}
                                label="True"
                                value="True"
                                checked={question.correctAnswer === "True"}
                                onChange={(e) => updateQuestion(index, { correctAnswer: e.target.value })}
                              />
                              <FormCheck
                                type="radio"
                                id={`false-${index}`}
                                name={`correct-${index}`}
                                label="False"
                                value="False"
                                checked={question.correctAnswer === "False"}
                                onChange={(e) => updateQuestion(index, { correctAnswer: e.target.value })}
                              />
                            </div>
                          </div>
                        )}

                        {/* Fill in the Blank Questions */}
                        {question.type === "FILL_IN_BLANK" && (
                          <div className="mb-3">
                            <Form.Label className="fw-bold mb-3 d-block">Possible Correct Answers</Form.Label>
                            <p className="text-muted small mb-2">Answers are case insensitive. Add all possible correct answers.</p>
                            {(question.possibleAnswers || []).map((answer: string, answerIndex: number) => (
                              <div key={answerIndex} className="mb-2 d-flex gap-2">
                                <FormControl
                                  type="text"
                                  value={answer}
                                  onChange={(e) => {
                                    const updatedAnswers = [...(question.possibleAnswers || [])];
                                    updatedAnswers[answerIndex] = e.target.value;
                                    updateQuestion(index, { possibleAnswers: updatedAnswers });
                                  }}
                                  placeholder={`Answer ${answerIndex + 1}`}
                                />
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    const updatedAnswers = (question.possibleAnswers || []).filter((_: string, i: number) => i !== answerIndex);
                                    updateQuestion(index, { possibleAnswers: updatedAnswers });
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                const updatedAnswers = [...(question.possibleAnswers || []), ""];
                                updateQuestion(index, { possibleAnswers: updatedAnswers });
                              }}
                              className="mt-2"
                            >
                              + Add Answer
                            </Button>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <Button variant="primary" onClick={() => saveQuestion(index)}>
                            Save Question
                          </Button>
                          <Button variant="secondary" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // VIEW MODE
                      <div>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">
                              Question {index + 1} - {question.type === "MULTIPLE_CHOICE" ? "Multiple Choice" : question.type === "TRUE_FALSE" ? "True/False" : "Fill in the Blank"}
                            </h6>
                            {question.title && (
                              <p className="mb-1 fw-bold">{question.title}</p>
                            )}
                            <p className="mb-1">{question.question}</p>
                            {question.type === "TRUE_FALSE" && (
                              <small className="text-muted">
                                Correct Answer: <strong>{question.correctAnswer}</strong>
                              </small>
                            )}
                            {question.type === "FILL_IN_BLANK" && (
                              <small className="text-muted">
                                Possible Answers: <strong>{(question.possibleAnswers || []).join(", ") || "None"}</strong>
                              </small>
                            )}
                            <div className="mt-1">
                              <small className="text-muted">
                                Points: <strong>{question.points || 0}</strong>
                              </small>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                setOriginalQuestion(JSON.parse(JSON.stringify(question)));
                                setEditingQuestionIndex(index);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteQuestion(index)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save Questions Button */}
          <div className="mt-4 d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={cancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveQuiz} className="me-2">
              Save
            </Button>
            <Button variant="success" onClick={saveAndPublish}>
              Save & Publish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}