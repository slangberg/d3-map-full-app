import Alert from "@mui/material/Alert";
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearLoginError } from "../store/actions";
import useStoredAuth from "../utils/authHandler";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);
  const authUser = useStoredAuth();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login(
        {
          username: data.get("username"),
          password: data.get("password"),
          remember: data.get("remember"),
        },
        navigate
      )
    );
  };

  const clearError = () => dispatch(clearLoginError());

  if (authUser) {
    return <Navigate to="/display" />;
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
          {authError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {authError}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!authError}
            onChange={clearError}
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
            onChange={clearError}
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
