import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import useProfileForm from "./useProfileFormHook";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/actions";

import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AuthBanner from "../../components/AuthBanner";
import { getAuthUser } from "../../store/selectors";

export default function Profile() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { handleSubmit, formFields, errors, isValid, setValue } =
    useProfileForm();
  const user = useSelector(getAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue(user);
    }
  }, [user]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  return (
    <Container component="main">
      <Container component="div" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <AuthBanner
              successBtnText="Go To Display"
              successBtnRoute="/display"
            />
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                  required
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
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
      <ConfirmDeleteModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      />
    </Container>
  );
}
