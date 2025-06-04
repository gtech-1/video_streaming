// AuthContext.js
import React, { createContext, useContext, useEffect ,useState} from "react";


const AuthContext = createContext(null); 

export const AuthProvider = ({ children, value }) => {

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
