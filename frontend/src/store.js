import {configureStore} from '@reduxjs/toolkit';
 import { apiSlice } from './slices/apiSlice';
 import authReducer from "./slices/authSlice";
 import docReducer from "./slices/doctorSlices/doctorAuthSlice";
 import adminAuthSlice from './slices/adminSlices/adminAuthSlice';


 const store = configureStore({
     reducer: { auth:authReducer,
                 docAuth:docReducer,
                 adminAuth:adminAuthSlice,

         [apiSlice.reducerPath]:apiSlice.reducer,

},
     middleware: (getDefaultMiddleware) => getDefaultMiddleware()
     .concat(apiSlice.middleware),
    devTools: true,
   });


  
   export default store;
