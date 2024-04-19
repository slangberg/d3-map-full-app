import { useState, useCallback } from "react";
import { AuthContext } from "../utils/authHandler";
import axiosInstance from "../utils/axios";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // Placeholder for auth logic
  const login = async (loginData) => {
    try {
      const { remember, ...rest } = loginData;
      console.log(loginData);
      // Attempt to login
      const response = await axiosInstance.post("/auth/login", { ...rest });
      localStorage.setItem("useSession", remember);
      localStorage.setItem("authToken", response.data.token);
      setUser(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error(err.data);
      setError(err.data?.error || "An unexpected error occurred");
    }
  };

  const ml = useCallback(login, []);

  const logout = async () => {
    try {
      // Attempt to logout
      await axiosInstance.post("/logout", user);
      localStorage.removeItem("authToken");
      setUser(null);
      setError(null);
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: ml, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
