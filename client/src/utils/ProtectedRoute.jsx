import { Navigate } from "react-router-dom";
import { getUser } from "./getUser";

//content of ./getUser same
// const getUserFromToken = () => {
//   const token = localStorage.getItem("TOKEN");
//   if (!token) return null;

//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch {
//     return null;
//   }
// };

const roleLoginMap = {
  creator: "/login/creator",
  mentor: "/login/mentor",
  collaborator: "/login/collaborator",
  admin: "/login/admin",
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUser();

  //No token
  if (!user) {
    return <Navigate to="/login/creator" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={roleLoginMap[user.role]} replace />;
  }

  return children;
};

export default ProtectedRoute;