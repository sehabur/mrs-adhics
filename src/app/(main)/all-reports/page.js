import React from "react";

import Reports from "./Reports";
import { Box } from "@mui/material";

export default async function Page() {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Reports />
    </Box>
  );
}
