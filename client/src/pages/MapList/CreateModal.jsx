import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useMapForm from "./useMapCreateForm";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { createMap } from "../../store/actions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DropzoneArea } from "mui-file-dropzone";

export default function CreateMapModal({ onClose, open }) {
  const dispatch = useDispatch();
  const { handleSubmit, formFields, errors, setValue, isValid, clearForm } =
    useMapForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    dispatch(createMap(formData));
    onClose();
  };

  const onCloseHandler = () => {
    clearForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      fullWidth
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton
        aria-label="close"
        onClick={onCloseHandler}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle id="alert-dialog-title">
        Are You Sure You Want To Delete Your Account?
      </DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                {...formFields.title}
                error={!!errors.title}
                helperText={errors.title?.message}
                required
                fullWidth
                id="title"
                label="Title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...formFields.description}
                error={!!errors.description}
                helperText={errors.description?.message}
                required
                fullWidth
                multiline
                id="description"
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" {...formFields.file} />
                <DropzoneArea
                  filesLimit={1}
                  acceptedFiles={["image/*"]}
                  dropzoneText="Drag and drop a image here or click"
                  onChange={console.log}
                />
              </Button> */}
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={["image/*"]}
                dropzoneText="Drag and drop a image here or click"
                onChange={(files) => setValue("file", files[0])}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Save Map
        </Button>
      </DialogActions>
    </Dialog>
  );
}
