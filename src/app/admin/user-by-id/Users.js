"use client";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

export default function Users({ id }) {
  const [formData, setFormData] = React.useState({
    id: id,
    otpVerificationStatus: "",
    userType: "",
  });

  const auth = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = React.useState(false);

  const [users, setUsers] = React.useState();

  const [message, setMessage] = React.useState({
    severity: "info",
    text: "",
  });

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
      const res = await fetch(`/api/admin/user-by-id`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          severity: "success",
          text: "Update successful",
        });
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

  async function getData() {
    setIsLoading(true);

    const res = await fetch(`/api/admin/user-by-id?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    setIsLoading(false);

    setFormData({
      id: id,
      email: data.data.email,
      emiratesId: data.data.emirates_id,
      otpVerificationStatus: data.data.otp_verification_status,
      userType: data.data.user_type,
    });
    return;
  }

  React.useEffect(() => {
    getData();
  }, [auth]);

  [
    {
      id: 1,
      title: "0-2 (infant)",
      value: "infant",
    },
    {
      id: 2,
      title: "3-5 (toddler)",
      value: "toddler",
    },
  ];
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Paper sx={{ py: 2, px: 4, maxWidth: 400 }} variant="outlined">
        <Typography sx={{ fontSize: "1.6rem", fontWeight: 700, mb: 2 }}>
          User Update
        </Typography>

        {message.text && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={message.severity}>{message.text}</Alert>
          </Box>
        )}

        <Box sx={{ my: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              gutterBottom
              sx={{ fontSize: "1.2rem", fontWeight: 700 }}
            >
              User info
            </Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Emirates Id: {formData.emiratesId}</Typography>
          </Box>

          <Box sx={{ my: 3 }}>
            <FormControl>
              <FormLabel htmlFor="otpVerificationStatus" sx={{ mb: 1 }}>
                OTP Verification Status
              </FormLabel>
              <TextField
                name="otpVerificationStatus"
                placeholder="your@email.com"
                required
                select
                fullWidth
                variant="outlined"
                size="small"
                value={formData.otpVerificationStatus}
                onChange={handleInputChange}
              >
                <MenuItem value="verified">Verified</MenuItem>
                <MenuItem value="not_verified">Not Verified</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Box sx={{ my: 3 }}>
            <FormControl>
              <FormLabel htmlFor="userType" sx={{ mb: 1 }}>
                User Type
              </FormLabel>
              <TextField
                name="userType"
                required
                select
                fullWidth
                variant="outlined"
                size="small"
                value={formData.userType}
                onChange={handleInputChange}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="researcher">Researcher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Box sx={{ my: 4 }}>
            <Button onClick={handleSubmit} variant="contained" sx={{ py: 1.5 }}>
              Submit and Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
