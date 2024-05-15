import { useEffect } from "react";
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
import useSignUpForm from "./useSignUpFormHook";
import { useDispatch } from "react-redux";
import { register, clearAuthBanner } from "../../store/actions";
import AuthBanner from "../../components/AuthBanner";

export default function SignUp() {
  const { handleSubmit, formFields, errors, isValid } = useSignUpForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthBanner());
  }, []);

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
          Sign Up For Datalous
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <AuthBanner successBtnText="Go To Login" successBtnRoute="/login" />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...formFields.username}
                error={!!errors.username}
                helperText={errors.username?.message}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...formFields.email}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...formFields.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                autoComplete="given-name"
                name="firstName"
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
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...formFields.password}
                error={!!errors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {errors.password?.message && (
              <FormHelperText error component="div">
                <ul>
                  {errors.password.message.split(",").map((error, index) => (
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
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
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
