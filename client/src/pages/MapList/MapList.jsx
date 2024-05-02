import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getList } from "../../store/actions";
import CreateModal from "./CreateModal";
import { getMapSearchMeta } from "../../store/selectors";
import MapCard from "./MapCard";
import MapListToolbar from "./MapListToolbar/MapListToolbar";
import { getMaps, getPaginationButtons } from "../../store/selectors";
export default function MapList() {
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const maps = useSelector(getMaps);
  const meta = useSelector(getMapSearchMeta);
  const paginationButtons = useSelector(getPaginationButtons);

  useEffect(() => {
    dispatch(getList());
  }, [meta]);
  return (
    <Container component="main">
      <CreateModal open={showCreate} onClose={() => setShowCreate(false)} />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: 2,
          }}
        >
          My Maps
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MapListToolbar onCreate={() => setShowCreate(true)} />
          </Grid>
          {maps.map((item) => (
            <Grid item xs={4} key={item._id}>
              <MapCard item={item} />
            </Grid>
          ))}
          {paginationButtons.length > 1 && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                {paginationButtons.map(({ label, current }) => (
                  <Button key={label} disabled={current}>
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
