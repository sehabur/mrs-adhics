"use client";
import { CircularProgress, Dialog, Box } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Dialog open={true} disableScrollLock={true}>
        <Box sx={{ p: 2.2, pb: 1.5 }}>
          <CircularProgress color="primary" />
        </Box>
      </Dialog>
    </Box>
  );
}
