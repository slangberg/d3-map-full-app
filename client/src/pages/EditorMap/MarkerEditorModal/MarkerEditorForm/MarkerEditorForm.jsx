import Grid from "@mui/material/Grid";
import MarkerEditor from "../../MarkerEditor/MarkerEditor";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
export default function MarkerEditorForm() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <MarkerEditor onOffsetChange={console.log} />
      </Grid>
      <Grid item xs={12} sm container spacing={2} rowSpacing={1}>
        <Grid item xs={12}>
          <TextField required fullWidth id="markerId" label="Marker ID" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="offsetX" label="Offset X" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="offsetY" label="Offset Y" />
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
