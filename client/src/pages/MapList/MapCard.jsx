import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { deleteMap, setActiveMap } from "../../store/actions";
import { useNavigate } from "react-router-dom";

export default function MapCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { baseImage, title, description, _id, updatedAt } = item;
  const formattedDate = new Date(updatedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getImageTypeFromUrl = () => {
    const match = baseImage.url.match(/\.([0-9a-z]+)([\?#]|$)/i);
    if (match && match[1]) {
      return match[1].toUpperCase();
    } else {
      return "Unknown";
    }
  };

  return (
    <Card raised>
      <CardMedia
        sx={{ minHeight: 200 }}
        image={baseImage.url}
        title={`${title} Map Image`}
      />
      <CardContent sx={{ pt: "5px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            {baseImage.width}x{baseImage.height} • {getImageTypeFromUrl()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(deleteMap(_id))}>
          Delete
        </Button>
        <Button
          size="small"
          onClick={async () => {
            await dispatch(setActiveMap(item));
            navigate(`/editor/${_id}`);
          }}
        >
          Edit Map
        </Button>
      </CardActions>
    </Card>
  );
}
