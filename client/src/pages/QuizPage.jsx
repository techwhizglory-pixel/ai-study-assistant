import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../services/api";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";

const QuizPage = () => {
  const { noteId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    createQuiz();
  }, []);

  const createQuiz = async () => {
    try {
      setLoading(true);

      const res = await generateQuiz({
        noteId,
        count: 5,
        difficulty: "medium",
      });

      const quizId = res.data.quiz._id;

      const quizRes = await getQuiz(quizId);

      setQuiz(quizRes.data.quiz);
    } catch (error) {
      console.log("Quiz Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = option;
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const res = await submitQuiz(quiz._id, answers);
      setResult(res.data);
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="md:hidden">
        <MobileBottomNav />
      </div>
        <div className="flex-1 md:ml-64 p-8">
          <div className="bg-white p-6 rounded-xl shadow">
            Generating Quiz...
          </div>
        </div>
      </div>
    );
  }

  // No quiz found
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="md:hidden">
        <MobileBottomNav />
      </div>
        <div className="flex-1 md:ml-64 p-8">
          <div className="bg-white p-6 rounded-xl shadow text-red-500">
            No quiz questions found.
          </div>
        </div>
      </div>
    );
  }

  // Quiz result page
  if (result) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
 <div className="md:hidden">
        <MobileBottomNav />
      </div>
        <div className="flex-1 md:ml-64 p-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">
              Quiz Completed 🎉
            </h1>

            <p className="text-lg mb-2">
              Score: {result.score}/{result.total}
            </p>

            <p className="text-green-600 font-semibold">
              Percentage: {result.percentage}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:hidden">
        <MobileBottomNav />
      </div>

      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">
            Question {currentQuestion + 1} of{" "}
            {quiz.questions.length}
          </h2>

          <p className="text-lg mb-6">
            {question.question}
          </p>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border transition ${
                  answers[currentQuestion] === option
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;