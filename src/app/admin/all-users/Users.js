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

export default function Users() {
  const auth = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = React.useState(false);

  const [users, setUsers] = React.useState();

  async function getData() {
    setIsLoading(true);

    const res = await fetch(`/api/admin/all-users`, {
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

  console.log(users);

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
                <TableCell>Email</TableCell>
                <TableCell>Emirates Id</TableCell>
                <TableCell>OTP Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell>{row.emirates_id}</TableCell>
                  <TableCell>{row.otp_verification_status}</TableCell>
                  <TableCell>{row.user_type}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={`/admin/user-by-id?user_id=${row.id}`}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
