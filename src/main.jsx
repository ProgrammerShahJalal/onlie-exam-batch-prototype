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
import ProtectedRoute from "./components/Misc/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      </ProtectedRoute>
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
    path: "/exam/instructions",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
