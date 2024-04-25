import { createContext, useEffect, useReducer } from "react";

const initialState = {
  
};


export const authContext = createContext(initialState);



const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
   
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(() => {
    
   
    if (state.user !== null) {
      localStorage.setItem('user', JSON.stringify(state.user));
      
    }
    if (state.token !== null) {
      localStorage.setItem('token', state.token);
      
    }
    if (state.role !== null) {
      localStorage.setItem('role', state.role);
      
    }
  }, [state]);

  return <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
    {children}
  </authContext.Provider>;
};
