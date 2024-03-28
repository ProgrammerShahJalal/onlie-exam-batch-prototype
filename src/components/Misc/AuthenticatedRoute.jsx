import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../utility/user";

const AuthenticatedRoute = ({ children }) => {
  const isAuthorized = getUserInfo()?.registration_no;
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthenticatedRoute;
