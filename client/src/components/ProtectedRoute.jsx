import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
