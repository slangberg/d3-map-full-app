import { useState } from "react";
import { AuthContext } from "../utils/authHandler";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Placeholder for auth logic
  const login = (user) => setUser(user);
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
