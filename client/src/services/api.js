import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ---------------- AUTH ----------------

// Register
export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

// Login
export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};

// Get current logged in user
export const getCurrentUser = (token) => {
  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ---------------- AI FEATURES ----------------

// Generate summary
export const generateSummary = (noteId, token) => {
  return API.post(
    "/ai/summarize",
    { noteId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Ask AI questions
export const askAIQuestion = (
  noteId,
  question,
  token
) => {
  return API.post(
    "/ai/ask",
    {
      noteId,
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



// ---------------- NOTES ----------------


export const uploadNote = (formData, token) => {
  return API.post("/notes/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getNotes = (token) => {
  return API.get("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNoteById = (id, token) => {
  return API.get(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deleteNote = (id, token) => {
  return API.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default API;