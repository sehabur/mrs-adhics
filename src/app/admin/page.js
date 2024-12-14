import { Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <main>
        <Card elevation={0}>
          <CardContent>
            <Typography fontSize="1.6rem">Welcome to admin panel!</Typography>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
