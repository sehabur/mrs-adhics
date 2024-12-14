"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Box,
  Button,
  Divider,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  Fade,
  Slide,
  Drawer,
  Avatar,
} from "@mui/material";
import { authActions } from "../redux-store/store";
import { Router } from "next/router";

export default function Header() {
  const dispatch = useDispatch();

  const router = useRouter();

  const theme = useTheme();

  const auth = useSelector((state) => state.auth);

  const handleSignout = () => {
    dispatch(authActions.logout());
    router.push("/");
  };

  return (
    <>
      {/* <ToastMessage
        open={logoutSuccess}
        onClose={handleLogoutToastColse}
        severity="success"
        message="Logout Successful!"
      /> */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: { xs: "inherit", sm: "1250px" },
            height: 20,
            mx: "auto",
          }}
        >
          <Box component={Link} href="/">
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
              MRS-ADHICS
            </Typography>
          </Box>
          {/* <Box component={Link} href="/">
            <img
              src={
                themeColor === "dark"
                  ? "/images/logo/logo-full-dark.png"
                  : "/images/logo/logo-full-light.png"
              }
              style={{
                width: "auto",
                marginTop: "5px",
                height: "33px",
                cursor: "pointer",
              }}
              alt="logo of stocksupporter"
            />
          </Box> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {auth && auth.user_type == "admin" && (
              <Button
                component={Link}
                href="/admin"
                sx={{
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Admin
              </Button>
            )}

            {auth && auth.user_type == "doctor" && (
              <Button
                component={Link}
                href="/upload"
                sx={{
                  px: 2,
                  borderRadius: 8,
                }}
              >
                Upload
              </Button>
            )}

            <Button
              component={Link}
              href="/reports"
              sx={{
                px: 2,
                borderRadius: 8,
              }}
            >
              Reports
            </Button>

            <Button
              component={Link}
              href="/dashboard"
              sx={{
                px: 2,
                borderRadius: 8,
              }}
            >
              Dashboard
            </Button>

            <Button
              component={Link}
              href="/access-request"
              sx={{
                px: 2,
                borderRadius: 8,
              }}
            >
              Advanced access
            </Button>

            {!auth?.isLoggedIn && (
              <Button
                component={Link}
                href="/signin"
                variant="outlined"
                sx={{
                  px: 2,
                  ml: 2,
                  borderRadius: 8,
                }}
              >
                Sign in
              </Button>
            )}

            {auth?.isLoggedIn && (
              <Button
                onClick={handleSignout}
                variant="outlined"
                sx={{
                  px: 2,
                  ml: 2,
                  borderRadius: 8,
                }}
              >
                Sign out
              </Button>
            )}

            {/* <Button
              component={Link}
              href="/signup"
              variant="contained"
              color="warning"
              sx={{
                px: 2,
                ml: 2,
                borderRadius: 2,
              }}
            >
              Create account
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ bgcolor: "background.default" }} />
    </>
  );
}
