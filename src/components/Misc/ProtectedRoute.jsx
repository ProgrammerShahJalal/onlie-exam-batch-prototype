import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../utility/user";

const ProtectedRoute = ({ children }) => {
  const isAuthorized = getUserInfo()?.registration_no;
  const location = useLocation();

  console.log(isAuthorized);

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
