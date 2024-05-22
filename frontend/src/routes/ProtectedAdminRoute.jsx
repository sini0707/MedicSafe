import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  if (admin) {
    const role = admin.role;

    const token = admin.token;

    const isAllowed = allowedRoles.includes(role);

    const accessibleRoute =
      token && isAllowed ? children : <Navigate to="/admin" replace={true} />;

    return accessibleRoute;
  }
};

export default ProtectedRoute;
