import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <Box
          sx={{
            maxWidth: 1280,
            height: 318,
            mx: "auto",
            backgroundImage: 'url("images/section.png")',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography fontSize="2.6rem" fontWeight="700">
              Access publicly available medical data
            </Typography>
            <Button
              component={Link}
              href="/admin"
              variant="contained"
              sx={{ fontSize: "1.3rem", mt: 3, borderRadius: 8, px: 4 }}
            >
              Create new account
            </Button>
          </Box>
        </Box>
      </main>
    </div>
  );
}
