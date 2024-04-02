import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExamIstructions from "./pages/ExamIstructions.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Exam from "./pages/Exam.jsx";
import Login from "./pages/Login.jsx";
import Authentication from "./pages/Authentication.jsx";
import AuthenticatedRoute from "./components/Misc/AuthenticatedRoute.jsx";
import TeacherRoute from "./components/Misc/TeacherRoute.jsx";
import ExamAdd from "./pages/ExamAdd.jsx";
import QuestionAdd from "./pages/QuestionAdd.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/authenticate",
    element: <Authentication />,
  },
  {
    path: "/exam/instructions/:examId",
    element: (
      <DashboardLayout>
        <ExamIstructions />
      </DashboardLayout>
    ),
  },
  {
    path: "/exam/start",
    element: (
      <DashboardLayout>
        <Exam />
      </DashboardLayout>
    ),
  },
  {
    path: "/teacher/exam-add",
    element: (
      <TeacherRoute>
        <DashboardLayout>
          <ExamAdd />
        </DashboardLayout>
      </TeacherRoute>
    ),
  },
  {
    path: "/teacher/question-add",
    element: (
      <TeacherRoute>
        <DashboardLayout>
          <QuestionAdd />
        </DashboardLayout>
      </TeacherRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
