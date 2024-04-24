import { useLocation, Navigate } from "react-router-dom";
import { setAuthError } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
export default function ProtectedRoute({ children }) {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let location = useLocation();

  if (!authUser) {
    dispatch(setAuthError("User Not Logged"));
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
