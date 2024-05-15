import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Logo from "../assets/Logo.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { login, clearAuthBanner, clearAuthError } from "../store/actions";
import { getAuthError } from "../store/selectors";
import useStoredAuth from "../utils/authHandler";
import { Navigate } from "react-router-dom";
import AuthBanner from "../components/AuthBanner";
import { useEffect } from "react";
export default function SignIn() {
  const authError = useSelector(getAuthError);
  const authUser = useStoredAuth();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        username: data.get("username"),
        password: data.get("password"),
        remember: data.get("remember"),
      })
    );
  };

  useEffect(() => {
    if (authError) {
      dispatch(clearAuthError());
    }
  }, []);

  const clearBanner = () => dispatch(clearAuthBanner());

  if (authUser) {
    return <Navigate to="/list" />;
  }

  return (
    <Container component="main" maxWidth="xs">
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
          Sign in to Datalous
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <AuthBanner />
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!authError}
            onChange={clearBanner}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!authError}
            onChange={clearBanner}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
