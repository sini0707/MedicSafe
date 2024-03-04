

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
 
  const doctor=JSON.parse( localStorage.getItem("doctorInfo"));

  if(doctor){
   
    const role=doctor.role
    
    const token=doctor.token
   
    const isAllowed = allowedRoles.includes(role);
   
     const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;

       return accessibleRoute;
  }
};

export default ProtectedRoute;


