// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const admin = JSON.parse(localStorage.getItem("adminInfo"));

//   if (admin) {
//     const role = admin.role;

//     const token = admin.token;

//     const isAllowed = allowedRoles.includes(role);

//     const accessibleRoute =
//       token && isAllowed ? children : <Navigate to="/admin" replace={true} />;

//     return accessibleRoute;
//   }
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  if (!admin) {
   
    return <Navigate to="/admin" replace={true} />;
  }

  const { role, token } = admin;

  if (token && allowedRoles.includes(role)) {
   
    return children;
  } else {

    return <Navigate to="/error" replace={true} />;
  }
};

export default ProtectedRoute;
