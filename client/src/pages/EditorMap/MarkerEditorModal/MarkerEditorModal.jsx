import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import MarkerEditorForm from "./MarkerEditorForm/MarkerEditorForm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import { DropzoneArea } from "mui-file-dropzone";
import { useEditor, EditorProvider } from "../MarkerEditor/MarkerEditorContext";
import MarkerStep from "./MarkerStep/MarkerStep";

function MarkerEditorModal({ onClose, open }) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepValid, setStepValid] = useState(false);
  const { api } = useEditor();
  const cancelCreate = () => {
    onClose();
  };

  const handleFileChange = (files) => {
    setStepValid(false);
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => api?.initEditor(e.target.result);
      reader.readAsText(file);
      setStepValid(true);
    }
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
    setStepValid(false);
  };

  const goToStep = (step) => {
    setActiveStep(step);
    setStepValid(false);

    if (step === 0) {
      api?.clearEditor();
    }

    if (step === 1) {
      console.log("reset");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={cancelCreate}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create New Marker Type
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepButton color="inherit" onClick={() => goToStep(0)}>
              Import Marker SVG
            </StepButton>
          </Step>
          <Step>
            <StepButton
              disabled={activeStep < 1}
              color="inherit"
              onClick={() => goToStep(1)}
            >
              Edit Marker SVG
            </StepButton>
          </Step>
          <Step disabled={activeStep < 2}>
            <StepLabel>Save Marker</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ mt: 3 }}>
          <MarkerStep
            index={0}
            activeStep={activeStep}
            nextClick={handleNextStep}
            nextDisabled={!stepValid}
          >
            <DropzoneArea
              filesLimit={1}
              inputProps={{ accept: ".svg" }}
              showAlerts={false}
              onChange={handleFileChange}
            />
          </MarkerStep>
          <MarkerStep
            index={1}
            activeStep={activeStep}
            nextClick={handleNextStep}
            nextDisabled={!stepValid}
            prevClick={() => goToStep(0)}
          >
            <MarkerEditorForm />
          </MarkerStep>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function WrapperModal(props) {
  return (
    <EditorProvider>
      <MarkerEditorModal {...props} />
    </EditorProvider>
  );
}
