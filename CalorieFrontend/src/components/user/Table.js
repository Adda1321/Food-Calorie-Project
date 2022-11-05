import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddFood from "./AddFood";
import Modal from "@mui/material/Modal";
import config from "../../config";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function FoodTable(props) {
  const { Users, currentUser, Food, setFood } = props;
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState(null);
  const [option, setOption] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleOpen = (entity, option) => {
    setOpen(true);
    setOption(option);
    setEntity(entity);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TableContainer sx={{ marginTop: 5 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>User name </TableCell>
              <TableCell align="left" sx={{ fontWeight: 800 }}>
                Food entities
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 800 }}>
                Calories
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 800 }}>
                Created At
              </TableCell>
              {config.ADMIN && (
                <>
                  <TableCell align="left" sx={{ fontWeight: 800 }}>
                    Edit
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 800 }}>
                    Add
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(Food).map((entity) => (
              <TableRow
                key={entity._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Users[entity.UserID]?.Username}
                </TableCell>
                <TableCell align="left">{entity.Food}</TableCell>
                <TableCell align="left">{entity.Calorie}</TableCell>

                <TableCell align="left">
                  {moment(entity.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                {config.ADMIN && (
                  <>
                    <TableCell align="left">
                      <Button onClick={() => handleOpen(entity, "edit")} sx={{marginLeft:-2}}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handleOpen(entity, "add")} sx={{marginLeft:-2}}>
                        Add
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddFood
            entity={entity}
            setOpen={setOpen}
            option={option}
            setFood={setFood}
            Food={Food}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default FoodTable;
