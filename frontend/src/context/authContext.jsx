import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const tokenSetter = (token) => {
    setToken(token);
    sessionStorage.setItem("user", token);
  };

  const deleteToken = () => {
    setToken("");
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("user");
    if (token) {
      setToken(token);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ token, tokenSetter, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
