import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ReportTable(props) {
  const { FilteredFood, users , title} = props;

  return (
<>
<Typography variant="h4" sx={{marginTop:2 , marginBottom:2}}>
  {title}
</Typography>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            
          <StyledTableCell sx={{ fontWeight: 800 }}>User name </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: 800 }}>
                Food entities
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: 800 }}>
                Calories
              </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(FilteredFood).map((entity) => (
            <TableRow
              key={entity._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {users[entity?.UserID]?.Username}
              </TableCell>
              <TableCell align="left">{entity.Food}</TableCell>
              <TableCell align="left">{entity.Calorie}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ReportTable;
