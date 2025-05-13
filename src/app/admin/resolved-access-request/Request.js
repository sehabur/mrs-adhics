"use client";
import { Button, Typography } from "@mui/material";
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

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Request() {
  const auth = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = React.useState(false);

  const [users, setUsers] = React.useState();

  async function getData() {
    setIsLoading(true);

    const res = await fetch(`/api/admin/all-access-requests?status=resolved`, {
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
    return setUsers(data.data);
  }

  React.useEffect(() => {
    getData();
  }, [auth]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Typography
        sx={{ fontSize: "1.6rem", fontWeight: 700, mb: 2, textAlign: "center" }}
      >
        List of All Users
      </Typography>
      <Box>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: grey[300] }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Emirates Id</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Work Place</TableCell>
                <TableCell>Access Type</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.emirates_id}</TableCell>
                  <TableCell>{row.job_title}</TableCell>
                  <TableCell>{row.work_place}</TableCell>
                  <TableCell>
                    {capitalizeFirstLetter(row.access_type)}
                  </TableCell>
                  <TableCell>{row.request_status}</TableCell>
                  {/* <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={`/admin/user-by-id?id=${row.user_id}`}
                    >
                      Update
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
