import { useLocation, Navigate } from "react-router-dom";
import { setAuthError } from "../store/actions";
import { useDispatch } from "react-redux";
import ApplicationHeader from "./ApplicationHeader";

import useStoredAuth from "../utils/authHandler";
export default function ProtectedRoute({ children }) {
  const authUser = useStoredAuth();
  const dispatch = useDispatch();
  let location = useLocation();

  if (!authUser) {
    dispatch(setAuthError("User Not Logged"));
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <ApplicationHeader />
      {children}
    </>
  );
}
