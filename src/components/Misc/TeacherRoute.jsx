import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../utility/user";

const TeacherRoute = ({ children }) => {
  const isAuthorized = getUserInfo()?.role === "teacher";
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default TeacherRoute;
