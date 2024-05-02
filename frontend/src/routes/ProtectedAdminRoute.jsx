
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    console.log('Entering ProtectedRoute component');
 
  const admin=JSON.parse( localStorage.getItem("adminInfo"));
  console.log('Admin info:', admin);


  if(admin){
    console.log('Admin is logged in');
   
    const role=admin.role
    console.log('Admin role:', role);
   
    
    const token=admin.token
    console.log('Admin token:', token);
   
    const isAllowed = allowedRoles.includes(role);
    console.log('Is admin allowed:', isAllowed);

     const accessibleRoute = token && isAllowed ? children : <Navigate to="/admin" replace={true} />;
     console.log('Accessible route:', accessibleRoute);
       return accessibleRoute;
  }
};

export default ProtectedRoute;