import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions";
export default function useStoredAuth() {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const storedUser =
    localStorage.getItem("datalousUser") ||
    sessionStorage.getItem("datalousUser");

  useEffect(() => {
    if (!authUser) {
      if (storedUser) {
        dispatch(loginAction(JSON.parse(storedUser)));
      }
    }
  }, [authUser]);

  return authUser || JSON.parse(storedUser);
}
