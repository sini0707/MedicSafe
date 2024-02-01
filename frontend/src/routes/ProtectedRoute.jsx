
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({children,allowedRoles}) => {
  
    const {token,role}=useContext(authContext);
    const isAllowed=allowedRoles.includes(role);
    const accessibleRoute=
    token && isAllowed ? children:<Navigate to="/login" replace={true}/>
    return accessibleRoute;

 

   
 
};

export default ProtectedRoute

// import { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { authContext } from '../context/AuthContext';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { token, role } = useContext(authContext);
// console.log('ggggggg');
//   useEffect(() => {
//     // Check authentication on component mount
//     const isAuthenticated = token && allowedRoles.includes(role);
// console.log(isAuthenticated,'bnnnmnnnnnn');
//     // Redirect to MyAccount page if authenticated and has the appropriate role
//     if (isAuthenticated && allowedRoles.includes(role)) {
//       return <Navigate to="/myAccount" replace />;
//     }

//     // Redirect to login page if not authenticated or does not have the appropriate role
//     if (!isAuthenticated) {
//       window.location.replace('/login');
//     }
//   }, [token, role, allowedRoles]);

//   // Return children if authenticated, otherwise return null
//   return token && allowedRoles.includes(role) ? children : null;
// };

// export default ProtectedRoute;


