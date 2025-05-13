"use client";
import { Button, MenuItem, Typography } from "@mui/material";
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
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { grey } from "@mui/material/colors";
import Link from "next/link";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { gender, medicalConditions, uaeAreas } from "../../../helpers/data";

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Reports() {
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const [reports, setReports] = React.useState();

  const [displayReports, setDisplayReports] = React.useState();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  console.log(displayReports);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    console.log(reports);

    const newReports = reports
      .filter(
        (report) =>
          report.age <= (formData?.ageMax || 500) &&
          report.age >= (formData?.ageMin || 0)
      )
      .filter((report) => {
        if (formData?.gender) {
          return report.gender == formData?.gender;
        } else {
          return report;
        }
      })
      .filter((report) => {
        if (formData?.location) {
          return report.location
            .toLowerCase()
            .includes(formData?.location.toLowerCase());
        } else {
          return report;
        }
      })
      .filter((report) => {
        if (formData?.medicalCondition) {
          return report.medical_condition
            .toLowerCase()
            .includes(formData?.medicalCondition.toLowerCase());
        } else {
          return report;
        }
      });

    console.log(newReports);
    setDisplayReports(newReports);
  };

  async function getData() {
    setIsLoading(true);

    const res = await fetch(`/api/all-reports-file`, {
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
    setReports(data.data);
    setDisplayReports(data.data);
    return;
  }

  React.useEffect(() => {
    getData();
  }, [auth]);

  return (
    <Box sx={{ display: "flex", gap: 4, my: 3, maxWidth: 1350, mx: "auto" }}>
      {isLoading && <LoadingSpinner />}
      <Paper
        variant="outlined"
        sx={{
          maxWidth: 370,
          height: 510,
          px: 4,
          py: 2,
          mt: 6.5,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 2, mt: 1.5 }}
        >
          Filter Reports
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
                  // required
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
                  // required
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
                // required
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
                // required
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
                // required
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
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              mb: 2,
            }}
          >
            All Reports
          </Typography>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ maxWidth: 1250, mx: "auto" }}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ bgcolor: grey[300] }}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>Medical Condition</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayReports?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>

                    <TableCell>{row.pdf_location.split("/")[2]}</TableCell>

                    <TableCell sx={{ maxWidth: 250 }}>
                      {capitalizeFirstLetter(row.medical_condition)}
                    </TableCell>

                    <TableCell sx={{ maxWidth: 250 }}>{row.age}</TableCell>

                    <TableCell sx={{ maxWidth: 250 }}>{row.location}</TableCell>

                    <TableCell>{row.created_at.split("T")[0]}</TableCell>

                    <TableCell>
                      <Typography
                        component={Link}
                        href={row.pdf_location}
                        target="_blank"
                        sx={{ textDecoration: "underline", color: "blue" }}
                      >
                        Download PDF
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
