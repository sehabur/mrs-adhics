"use client";
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { Alert, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";

import pdfToText from "react-pdftotext";

import { gender, medicalConditions, uaeAreas } from "../../../helpers/data";

const alertInitstate = {
  severity: "info",
  text: "",
};

export default function Upload() {
  const [formData, setFormData] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState(alertInitstate);

  const auth = useSelector((state) => state.auth);

  const [uploadFile, setUploadFile] = React.useState(null);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setUploadFile(file);

    pdfToText(file)
      .then((text) => {
        setFormData({
          pdfText: text,
        });
      })
      .catch((error) => console.error("Failed to extract text from pdf"));
  };

  const handleSubmit = async (event, type) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch(`/api/upload-report?type=${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      const fileFormData = new FormData();
      fileFormData.append("file", uploadFile);
      fileFormData.append("report_id", data.data.insertId);

      const res2 = await fetch("/api/upload-pdf-file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        body: fileFormData,
      });

      if (res.ok && res2.ok) {
        setMessage({
          severity: "success",
          text: "Report upload successful",
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

  console.log(formData);

  return (
    <>
      <Box sx={{ maxWidth: 950, mx: "auto", py: 4 }}>
        {isLoading && <LoadingSpinner />}
        <Card
          variant="outlined"
          sx={{ maxWidth: 950, mx: "auto", px: 4, py: 3, borderRadius: 3 }}
        >
          <Typography
            component="h1"
            sx={{ width: "100%", fontSize: "1.5rem", mb: 4 }}
          >
            Upload Report
          </Typography>

          {message.text && (
            <Box sx={{ mb: 2, maxWidth: 860 }}>
              <Alert severity={message.severity}>{message.text}</Alert>
            </Box>
          )}

          <Box>
            <Typography
              component="h1"
              sx={{ width: "100%", fontSize: "1.2rem", fontWeight: 700, mb: 2 }}
            >
              Upload PDF File
            </Typography>

            {/* <input
              type="file"
              id="file-upload"
              accept="application/pdf"
              onChange={extractText}
              style={{ display: "none" }} // Hide default input
            />

            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Select File
              </Button>
            </label> */}

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <Box>
              <Button
                color="success"
                variant="contained"
                onClick={(e) => handleSubmit(e, "pdfUpload")}
                sx={{ mt: 3 }}
              >
                Upload and Save
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }}>OR</Divider>

          <Typography
            component="h1"
            sx={{ width: "100%", fontSize: "1.2rem", fontWeight: 700, mb: 2 }}
          >
            Entry Manual Data
          </Typography>

          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            justifyContent="flex-start"
            component="form"
            onSubmit={(e) => handleSubmit(e, "manualEntry")}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl>
                <FormLabel htmlFor="email" sx={{ mb: 1 }}>
                  Patient Id
                </FormLabel>
                <TextField
                  id="patientId"
                  name="patientId"
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  sx={{ width: 260 }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Age</FormLabel>
                <TextField
                  id="age"
                  name="age"
                  type="number"
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formData.age}
                  onChange={handleInputChange}
                  sx={{ width: 260 }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Gender</FormLabel>
                <TextField
                  id="gender"
                  name="gender"
                  select
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formData.gender}
                  onChange={handleInputChange}
                  sx={{ width: 260 }}
                >
                  {gender?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Patient Geo Graphic</FormLabel>
                <TextField
                  id="location"
                  name="location"
                  select
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formData.location}
                  onChange={handleInputChange}
                  sx={{ width: 260 }}
                >
                  {uaeAreas?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Medical Condition</FormLabel>
                <TextField
                  id="medicalCondition"
                  name="medicalCondition"
                  select
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formData.medicalCondition}
                  onChange={handleInputChange}
                  sx={{ width: 260 }}
                >
                  {medicalConditions?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Treatment Result</FormLabel>
                <textarea
                  id="treatmentResult"
                  name="treatmentResult"
                  required
                  rows={8}
                  cols={105}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: "5px",
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                  }}
                >
                  {formData.treatmentResult}
                </textarea>
              </FormControl>
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 1, px: 4 }}>
              Submit and save
            </Button>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
