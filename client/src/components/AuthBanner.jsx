import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
const AuthBanner = ({ successBtnText, successBtnRoute }) => {
  const authError = useSelector((state) => state.auth.error);
  const authSuccess = useSelector((state) => state.auth.success);
  const navigate = useNavigate();
  return (
    <>
      {authError && (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            mt: 2,
            mb: 2,
          }}
        >
          {authError}
        </Alert>
      )}
      {authSuccess && (
        <Alert
          severity="success"
          sx={{
            width: "100%",
            mt: 2,
            mb: 2,
          }}
          action={
            successBtnText &&
            successBtnRoute && (
              <Button variant="text" onClick={() => navigate(successBtnRoute)}>
                {successBtnText}
              </Button>
            )
          }
        >
          {authSuccess}
        </Alert>
      )}
    </>
  );
};

export default AuthBanner;
