"use client";
import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Divider, useTheme } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary">
      {"Copyright © "}
      <Box component="span" sx={{ fontWeight: 700 }}>
        MRS-ADHICS
      </Box>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 4 },
          pt: { xs: 3, sm: 5 },
          pb: { xs: 4, sm: 4 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Typography
                fontWeight={700}
                sx={{ mt: 2, mb: 1, fontSize: "1.1rem" }}
                color="text.primary"
              >
                Contact us
              </Typography>
              <Typography mb={0.5} color="text.primary">
                Hotline: +971-XX-1234567
              </Typography>
              <Typography color="text.primary">
                Email: support@mrs-adhics.com
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Dashboard
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Reports
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Usage history
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="/aboutus">
              About us
            </Link>
            <Link color="text.secondary" variant="body2" href="/faq">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
            >
              Legal
            </Typography>
            <Link color="text.secondary" variant="body2" href="/terms">
              Terms and Conditions
            </Link>
            <Link color="text.secondary" variant="body2" href="/privacy-policy">
              Privacy Policy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 3,
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
            gap: 2,
          }}
        >
          <Box>
            <Copyright />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
