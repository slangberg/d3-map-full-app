import Grid from "@mui/material/Grid";
import MarkerEditor from "../../MarkerEditor/MarkerEditor";
import TextField from "@mui/material/TextField";
import useMarkerEditorForm from "./useMarkerEditorForm";
import Button from "@mui/material/Button";
import { useEditor } from "../../MarkerEditor/MarkerEditorContext";
import { useEffect } from "react";
export default function MarkerEditorForm({ onFormSubmit }) {
  const { errors, formFields, setOffset, handleSubmit, isValid } =
    useMarkerEditorForm();
  const { highlighted, api } = useEditor();

  const prepareFile = (formData) => {
    const file = api.exportCurrentSvg();
    onFormSubmit({ ...formData, file });
  };

  useEffect(() => {
    if (isValid) {
      handleSubmit(prepareFile)();
    }
  }, [isValid]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Grid item>
        <MarkerEditor onOffsetChange={setOffset} />
      </Grid>
      <Grid item xs={12} sm container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            {...formFields.markerId}
            error={!!errors.markerId}
            helperText={errors?.markerId}
            required
            fullWidth
            id="markerId"
            label="Marker ID"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.xOffset}
            error={!!errors.xOffset}
            helperText={errors?.xOffset}
            fullWidth
            required
            type="number"
            id="offsetX"
            label="Offset X"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.yOffset}
            error={!!errors.yOffset}
            helperText={errors?.yOffset}
            fullWidth
            required
            type="number"
            id="offsetY"
            label="Offset Y"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.width}
            error={!!errors.width}
            helperText={errors?.width}
            fullWidth
            required
            type="number"
            id="width"
            label="Width"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.height}
            error={!!errors.height}
            helperText={errors?.height}
            fullWidth
            required
            type="number"
            id="height"
            label="Height"
          />
        </Grid>
        <Grid item xs={12}>
          {!highlighted && (
            <Button
              variant="contained"
              onClick={() => api.highlightExplicitFill()}
            >
              Highlight Inline Fill
            </Button>
          )}
          {highlighted && (
            <Button
              variant="contained"
              onClick={() => api.removeExplicitFillHighlight()}
            >
              Remove Highlighted Fill
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => api.removeExplicitFill()}
          >
            Remove Inline Fill
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
