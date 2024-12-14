"use client";
import { MenuItem, Paper, Typography } from "@mui/material";
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

export default function Main() {
  const [formData, setFormData] = React.useState({});

  const [output, setOutput] = React.useState();

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState({
    severity: "info",
    text: "",
  });

  const auth = useSelector((state) => state.auth);

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
      const res = await fetch(`/api/public-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setOutput(data.data);
      } else {
        setMessage({
          severity: "error",
          text: data.message,
        });
        setOutput(null);
      }
      setIsLoading(false);
    } catch (error) {
      setMessage({
        severity: "error",
        text: error.text,
      });
      setOutput(null);
      setIsLoading(false);
    }
  };

  console.log(output);

  return (
    <Box sx={{ display: "flex", gap: 6, my: 3, maxWidth: 900, mx: "auto" }}>
      <Paper
        variant="outlined"
        sx={{
          maxWidth: 370,
          height: 560,
          px: 4,
          py: 4,
          borderRadius: 3,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 0.5 }}>
          Public Medical Data Form
        </Typography>
        <Typography sx={{ fontSize: "1rem", mb: 3, color: "text.secondary" }}>
          Select the required information
        </Typography>

        {/* {message.text && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={message.severity}>{message.text}</Alert>
          </Box>
        )} */}

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
              <FormLabel sx={{ mb: 1 }}>Age Range</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                }}
              >
                <TextField
                  id="ageMin"
                  name="ageMin"
                  type="number"
                  placeholder="Min value"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.ageMin}
                  onChange={handleInputChange}
                  sx={{ width: 130 }}
                />
                <TextField
                  id="ageMax"
                  name="ageMax"
                  placeholder="Max value"
                  type="number"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.ageMax}
                  onChange={handleInputChange}
                  sx={{ width: 130 }}
                />
              </Box>
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>Gender</FormLabel>
              <TextField
                id="gender"
                name="gender"
                select
                required
                fullWidth
                variant="outlined"
                size="small"
                value={formData.gender}
                onChange={handleInputChange}
                sx={{ width: 275 }}
              >
                {gender?.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>Medical Condition</FormLabel>
              <TextField
                id="medicalCondition"
                name="medicalCondition"
                select
                required
                fullWidth
                variant="outlined"
                size="small"
                value={formData.medicalCondition}
                onChange={handleInputChange}
                sx={{ width: 275 }}
              >
                {medicalConditions?.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>Patient Geo Graphic</FormLabel>
              <TextField
                id="location"
                name="location"
                select
                required
                fullWidth
                variant="outlined"
                size="small"
                value={formData.location}
                onChange={handleInputChange}
                sx={{ width: 275 }}
              >
                {uaeAreas?.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
      <Box>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 3 }}>
          Public Medical Data
        </Typography>

        {isLoading && (
          <Box sx={{ my: 2 }}>
            <Typography>Loading..</Typography>
          </Box>
        )}

        {output && output.length > 0 ? (
          output?.map((item) => (
            <Paper
              variant="outlined"
              key={item.id}
              sx={{
                width: 550,
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: grey[50],
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Gender</Typography>
                <Typography>{item.gender}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Age</Typography>
                <Typography>{item.age}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Medical condition</Typography>
                <Typography>{item.medical_condition}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Treatment result</Typography>
                <Typography>{item.treatment_result}</Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography>{message.text}</Typography>
        )}
      </Box>
    </Box>
  );
}
