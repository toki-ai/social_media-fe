import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";

const SuggestUserCard = () => {
  return (
    <CardHeader
      sx={{ padding: "5px" }}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      }
      action={<Button size="small">Follow</Button>}
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
  );
};

export default SuggestUserCard;
