import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function page() {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 3, mb: 5 }}>
      <Box>
        <Typography fontSize="1.8rem" fontWeight="700" gutterBottom>
          {" "}
          Welcome!
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Are you employed in a established institution?
        </Typography>
        <Button component={Link} href="/access-request" variant="outlined">
          Request advanced access
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{ mb: 2, mt: 6, py: 2, px: 3, maxWidth: 600 }}
      >
        <Typography fontSize="1.3rem" fontWeight="700">
          View and update personal information
        </Typography>
        <Typography color="text.secondary">
          View and update personal documents and identification
        </Typography>
        <Button
          component={Link}
          href="/edit-profile"
          variant="contained"
          size="small"
          sx={{ mt: 2, px: 3, borderRadius: 2 }}
        >
          Start
        </Button>
      </Paper>

      <Paper variant="outlined" sx={{ my: 3, py: 2, px: 3, maxWidth: 600 }}>
        <Typography fontSize="1.3rem" fontWeight="700">
          Request Public Data
        </Typography>
        <Typography color="text.secondary">
          Submit a form and get access to publicly available medical data
        </Typography>
        <Button
          component={Link}
          href="/public-data-request"
          variant="contained"
          size="small"
          sx={{ mt: 2, px: 3, borderRadius: 2 }}
        >
          Start
        </Button>
      </Paper>
    </Box>
  );
}
