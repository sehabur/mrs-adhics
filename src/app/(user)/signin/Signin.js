"use client";
import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux-store/store";

const alertInitstate = {
  severity: "info",
  text: "",
};

export default function SignIn() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState(alertInitstate);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(authActions.login(data.data));
        setMessage({
          severity: "success",
          text: "Signin successful",
        });
        router.push("/");
      } else {
        setMessage({
          severity: "error",
          text: data.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setMessage({
        severity: "error",
        text: error.text,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: 1200, mx: "auto", py: 8 }}
      >
        {isLoading && <LoadingSpinner />}
        <Card
          variant="outlined"
          sx={{ maxWidth: 425, mx: "auto", px: 4, py: 4, borderRadius: 3 }}
        >
          <Typography
            component="h1"
            sx={{ width: "100%", fontSize: "1.5rem", mb: 3 }}
          >
            Sign in
          </Typography>

          {message.text && (
            <Box sx={{ mb: 2 }}>
              <Alert severity={message.severity}>{message.text}</Alert>
            </Box>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ mb: 1 }}>
                Email
              </FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ mb: 1 }}>
                Password
              </FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign in
            </Button>
          </Box>
          <Divider sx={{ mt: 4, mb: 2 }}>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              component={Link}
              href="/signup"
              sx={{
                textAlign: "center",
                color: "primary.main",
                ":hover": { textDecoration: "underline" },
              }}
            >
              Don&apos;t have an account? Sign up
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
