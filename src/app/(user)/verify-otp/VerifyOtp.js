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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux-store/store";

const alertInitstate = {
  severity: "info",
  text: "",
};

export default function VerifyOtp({ id }) {
  const [formData, setFormData] = React.useState({
    id,
    otp: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState(alertInitstate);

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      const res = await fetch(`/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // dispatch(authActions.login(data.data));
        setMessage({
          severity: "success",
          text: "Signin successful",
        });
        // router.push("/");
        handleClickOpen();
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for registering!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You may now login with your email and password
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, pr: 3 }}>
          <Button
            onClick={handleClose}
            autoFocus
            component={Link}
            href="/"
            variant="contained"
          >
            Back to homepage
          </Button>
        </DialogActions>
      </Dialog>

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
            sx={{ width: "100%", fontSize: "1.2rem", mb: 3 }}
          >
            Enter OTP sent to your email
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
                id="otp"
                name="otp"
                placeholder="OTP"
                required
                fullWidth
                autoFocus
                variant="outlined"
                value={formData.otp}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Confirm
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
