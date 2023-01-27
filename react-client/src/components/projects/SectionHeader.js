import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SectionHeader({ sectionNumber }) {
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> */}
        <Typography variant="h5" component="div">
          {`Section ${sectionNumber}`}
        </Typography>
        {/* <Typography variant="h5" component="div">
          {file.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Creator ID: ${file.userId} (Change this to creator name later)`}
        </Typography>
        <Typography variant="body2">Duration ("add this later")</Typography>
        <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </CardContent>
    </Card>
  );
}
