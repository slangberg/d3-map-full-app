import Grid from "@mui/material/Grid";
import MarkerEditor from "../../MarkerEditor/MarkerEditor";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMarkerEditorForm from "./useMarkerEditorForm";
export default function MarkerEditorForm() {
  const { errors, formFields, setOffset } = useMarkerEditorForm();
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
          <TextField required fullWidth id="markerId" label="Marker ID" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.xOffset}
            error={!!errors.xOffset}
            helperText={errors.title?.xOffset}
            fullWidth
            type="number"
            id="offsetX"
            label="Offset X"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...formFields.yOffset}
            error={!!errors.yOffset}
            helperText={errors.title?.yOffset}
            fullWidth
            type="number"
            id="offsetY"
            label="Offset Y"
          />
        </Grid>
        <Grid item>
          <Typography sx={{ cursor: "pointer" }} variant="body2">
            Remove
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
