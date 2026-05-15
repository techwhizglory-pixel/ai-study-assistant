import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);


// NOTES
export const uploadNote = (data) => API.post("/notes/upload", data);
export const getNotes = () => API.get("/notes");
export const deleteNote = (id) =>
  API.delete(`/notes/${id}`);


// SUMMARY
export const generateSummary = (noteId) =>
  API.post("/ai/summarize", { noteId });


// AI CHAT
export const askAI = (data) =>
  API.post("/ai/ask", data);


// QUIZ
export const generateQuiz = (data) =>
  API.post("/quiz/generate", data);

export const getQuiz = (quizId) =>
  API.get(`/quiz/${quizId}`);

export const submitQuiz = (quizId, answers) =>
  API.post(`/quiz/${quizId}/submit`, { answers });

export default API;