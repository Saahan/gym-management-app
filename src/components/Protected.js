import { Navigate } from "react-router-dom";
//A protected component which sheilds its children until the user is authenticated, i.e. the isAuthenticated flag is "true".
const Protected = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
