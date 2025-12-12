import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ATTEMPTS_API = `${HTTP_SERVER}/api/quizzes`;

// ========== QUIZ CRUD OPERATIONS ==========

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

// ========== QUIZ ATTEMPTS OPERATIONS ==========

// Save a quiz attempt
export const saveAttempt = async (attempt: any) => {
  const response = await axiosWithCredentials.post(
    `${ATTEMPTS_API}/${attempt.quizId}/attempts`,
    attempt
  );
  return response.data;
};

// Get all attempts for a student in a quiz
export const getAttemptsByStudent = async (
  quizId: string,
  studentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${quizId}/attempts/${studentId}`
  );
  return response.data;
};

// Get the most recent attempt for a student
export const getLastAttempt = async (
  quizId: string,
  studentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${quizId}/attempts/${studentId}/last`
  );
  return response.data;
};

// Get attempt count for a student
export const getAttemptCount = async (
  quizId: string,
  studentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${quizId}/attempts/${studentId}/count`
  );
  return response.data.count;
};

// Get a specific attempt by ID
export const getAttemptById = async (attemptId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/attempts/${attemptId}`
  );
  return response.data;
};