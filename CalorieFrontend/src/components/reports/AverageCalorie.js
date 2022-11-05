import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";
import config from "../../config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function AverageCalorie() {
  const [userWithCalories, setUserWithCalories] = useState(null);
  const getUserWithCalorie = () => {
    const url = `${config.BASEURL}/avgCalories`;

    return axios
      .get(url)
      .then((res) => {
        setUserWithCalories(res.data.users);
      })
      .catch((error) => {
        console.log("Error occured at getUserWithCalorie", error);
      });
  };

  useEffect(() => {
    getUserWithCalorie();
  }, []);

  return (
    <div style={{ marginLeft: 400, marginRight: 400 }}>
      <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
        Average Calorie Report
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: 800 }}>
                User name{" "}
              </StyledTableCell>

              <StyledTableCell align="left" sx={{ fontWeight: 800 }}>
                Average Calories
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userWithCalories?.map((userWithCalorie) => (
              <TableRow
                key={userWithCalorie._id._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {userWithCalorie._id.Username}
                </TableCell>
                <TableCell align="left">
                  {userWithCalorie.totalCalories}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AverageCalorie;
