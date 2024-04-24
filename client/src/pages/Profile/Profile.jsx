import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Logo from "../../assets/logo.svg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import useProfileForm from "./useProfileFormHook";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/actions";
import { useEffect } from "react";

export default function Profile() {
  const { handleSubmit, formFields, errors, isValid, setValue } =
    useProfileForm();
  const authError = useSelector((state) => state.auth.error);
  const registerSuccess = useSelector((state) => state.auth.success);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue(user);
    }
  }, [user]);

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={Logo} width={200} />
        <Typography component="h1" variant="h4">
          Edit Profile
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          {authError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 2 }}>
              {authError}
            </Alert>
          )}
          {registerSuccess && (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                mt: 2,
                mb: 2,
              }}
              action={
                <Button variant="text" onClick={() => navigate("/login")}>
                  Go To Login
                </Button>
              }
            >
              {registerSuccess}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...formFields.email}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...formFields.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...formFields.lastName}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...formFields.oldPassword}
                fullWidth
                label="Old Password"
                type="password"
                id="oldPassword"
                autoComplete="old-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...formFields.newPassword}
                error={!!errors.newPassword}
                fullWidth
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
              />
            </Grid>
            {errors.newPassword?.message && (
              <FormHelperText error component="div">
                <ul>
                  {errors.newPassword?.message
                    .split(",")
                    .map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                </ul>
              </FormHelperText>
            )}
            <Grid item xs={12}>
              <TextField
                {...formFields.confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
