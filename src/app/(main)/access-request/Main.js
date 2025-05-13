"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  ageRanges,
  gender,
  medicalConditions,
  uaeAreas,
} from "../../../helpers/data";

import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import Link from "next/link";

export default function Main() {
  const [formData, setFormData] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const auth = useSelector((state) => state.auth);

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

  console.log(formData);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`/api/access-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({ ...formData, userId: auth?.id }),
      });

      const data = await res.json();

      if (res.ok) {
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
      {isLoading && <LoadingSpinner />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for your request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please wait your confirmation through mail
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, pr: 3 }}>
          <Button
            onClick={handleClose}
            autoFocus
            component={Link}
            href="/dashboard"
            variant="contained"
          >
            Back to dashboard
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          my: 3,
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            px: 4,
            py: 4,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 1 }}>
            Advanced access request form
          </Typography>
          <Typography sx={{ fontSize: "1rem", mb: 3, color: "text.secondary" }}>
            Enter the following informtion to get apprroved
          </Typography>

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
            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Full Name</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Emirates Id</FormLabel>
                <TextField
                  id="emiratesId"
                  name="emiratesId"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.emiratesId}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Job Title</FormLabel>
                <TextField
                  id="jobTitle"
                  name="jobTitle"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Work Place</FormLabel>
                <TextField
                  id="workPlace"
                  name="workPlace"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.workPlace}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Access Type</FormLabel>
                <TextField
                  id="accessType"
                  name="accessType"
                  select
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.accessType}
                  onChange={handleInputChange}
                  sx={{ width: 380 }}
                >
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="researcher">Researcher</MenuItem>
                </TextField>
              </FormControl>
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
