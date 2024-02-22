

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  console.log('protexctedroute');
  const user=JSON.parse( localStorage.getItem("userInfo"));
console.log(user,'user');
  if(user){
   
    const role=user.role
    
    const token=user.token
   
    const isAllowed = allowedRoles.includes(role);
   
     const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;

       return accessibleRoute;
  }


  
   
    
  
};

export default ProtectedRoute;


