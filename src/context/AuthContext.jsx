// AuthContext.js
import React, { createContext, useContext, useEffect ,useState} from "react";


const AuthContext = createContext(null); 

export const AuthProvider = ({ children, value }) => {
    const [user, setUser] = useState(null);
console.log("AuthProvider user:", user);
 useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user:", storedUser);

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user"); // cleanup
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
