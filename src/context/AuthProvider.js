import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ username: "", password: "", jwtToken : null });

  // Add a function to update the token in the auth state
  const updateToken = (jwtToken) => {
    setAuth((prevAuth) => ({ ...prevAuth, jwtToken}));
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
