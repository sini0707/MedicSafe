

// import { Navigate } from 'react-router-dom';

// const ProtectedDoctorRoute = ({ children, allowedRoles }) => {
 
//   const user=JSON.parse( localStorage.getItem("doctorInfo"));

//   if(user){
   
//     const role=user.role
  
    
//     const token=user.token
   
//     const isAllowed = allowedRoles.includes(role);
   
//      const accessibleRoute = token && isAllowed ? children : <Navigate to="doctors/login" replace={true} />;

//        return accessibleRoute;
//   }
// };

// export default ProtectedDoctorRoute ;

import { Navigate } from 'react-router-dom';

const ProtectedDoctorRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("doctorInfo"));
  console.log('User info:', user);

  if (!user) {
    console.log('No user found, redirecting to login page.');
    // If user is not logged in, navigate to the login page
    return <Navigate to="/doctors/login" replace={true} />;
  }

  const { role, token } = user;
  console.log('User role:', role);
  console.log('User token:', token);

  if (token && allowedRoles.includes(role)) {
    console.log('User is authenticated and has the allowed role.');
    // If user is authenticated and has the allowed role, render the children components
    return children;
  } else {
    console.log('User does not have the required role, redirecting to error page.');
    // If user is logged in but does not have the required role, navigate to an error page
    return <Navigate to="/error" replace={true} />;
  }
};

export default ProtectedDoctorRoute;
