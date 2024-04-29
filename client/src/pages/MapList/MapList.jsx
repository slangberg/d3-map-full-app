import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getList } from "../../store/actions";
import CreateModal from "./CreateModal";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MapCard from "./MapCard";
export default function MapList() {
  const [showCreate, setShowCreate] = useState(false);
  const maps = useSelector((state) => state.maps.maps);
  console.log(maps);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList());
  }, []);
  return (
    <Container component="main">
      <CreateModal open={showCreate} />
      <button onClick={() => setShowCreate(true)}>Show</button>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          My Maps
        </Typography>
        <Grid container spacing={3}>
          {maps.map((item) => (
            <Grid item xs={4} key={item._id}>
              <MapCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
