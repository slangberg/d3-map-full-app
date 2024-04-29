import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { deleteMap } from "../../store/actions";
export default function MapCard({ item }) {
  const { baseImage, title, description, _id } = item;
  const dispatch = useDispatch();
  return (
    <Card raised>
      <CardMedia
        sx={{ minHeight: 240 }}
        image={baseImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(deleteMap(_id))}>
          Delete
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
