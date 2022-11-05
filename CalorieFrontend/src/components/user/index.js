import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import AddFood from "./AddFood";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Divider from "@mui/material/Divider";
import FoodTable from "./Table";
import Invite from "./Invite";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../helper/Alert";
import config from "../../config";

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

function ShowActivity() {
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [calorieAlert, setcalorieAlert] = useState(null);
  const [calorieLimit, setCalorieLimit] = useState(config.CALORIELIMIT);
  const [food, setFood] = useState(null);
  const [users, setUsers] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenInvite = () => setOpenInvite(true);
  const handleCloseInvite = () => setOpenInvite(false);

  const navigate = useNavigate();
  const BASEURL = config.BASEURL;
  const ADMIN = config.ADMIN;
  const handleAlert = (isAlert, errorMessage, status) => {
    setAlert(isAlert);
    setError(errorMessage);
    setAlertStatus(status);
  };
  const handleSignIn = (activeUser) => {
    setCurrentUser(activeUser);
    ADMIN ? getFood() : getFiltereFood(activeUser);
  };
  const getFood = async () => {
    const url = `${BASEURL}/getfood`;
    return axios
      .get(url)
      .then((res) => {
        setFood(res.data.updatedFood);
        setUsers(res.data.updatedUser);
      })
      .catch((error) => {
        console.log("Error occured at getFood", error);
      });
  };

  const getFiltereFood = async (activeUser) => {
    const url = `${BASEURL}/getFiltereFood`;
    return axios
      .get(url, {
        params: {
          id: activeUser._id,
        },
      })
      .then((res) => {
        setUsers(res.data.updatedUser);
        setFood(res.data.updatedFood);
      })
      .catch((error) => {
        console.log("Error occured at getFilteredFood", error);
      });
  };

  const getFirstUser = async () => {
    setAlert(false);
    const url = `${BASEURL}/get`;
    return axios
      .get(url, {
        params: {
          token: config.TOKEN,
        },
      })
      .then((res) => {
        res.data.data[0] ? handleSignIn(res.data.data[0]) : navigate("/error");
      })
      .catch((error) => {
        console.log("Error occured at getFirstUser", error);
      });
  };

  useEffect(() => {
    getFirstUser();
  }, [config.TOKEN]);

  useEffect(() => {
    //WARNING
    if (!ADMIN && food) {
      let FilteredData = Object.values(food).filter(
        (foodItem) => foodItem.UserID === currentUser._id
      );
      let TotalCalorie = FilteredData.reduce(
        (total, num) => (total = total + num.Calorie),
        0
      );
      if (TotalCalorie >= calorieLimit) {
        handleAlert(true, "Calorie Limit Exceeded ", "error");
      }
    }
  }, [calorieLimit, food]);

  const applyDateFilter = () => {
    setAlert(false);
    if (startDate < endDate) {
      const appendFilterFoods = Object.values(food).filter(
        (foodItem) =>
          moment(foodItem.createdAt).format("MM/DD/YYYY") <=
            moment(endDate.$d).format("L") &&
          moment(foodItem.createdAt).format("MM/DD/YYYY") >=
            moment(startDate.$d).format("L")
      );

      setFood({ ...appendFilterFoods });
    } else {
      handleAlert(true, "FromDate must be less than ToDate", "error");
    }
  };
  return (
    <div>
      {alert && (
        <CustomAlert
          error={error}
          alertStatus={alertStatus}
          calorieAlert={
            calorieAlert && moment(calorieAlert).format("DD/MM/YYYY")
          }
        />
      )}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          {!ADMIN && (
            <Button
              disabled={currentUser ? false : true}
              variant="contained"
              onClick={handleOpen}
            >
              Add new Food
            </Button>
          )}
        </Grid>
        <Grid item xs={ADMIN ? 12 : 6}>
          <Button variant="outlined" onClick={handleOpenInvite}>
            Invite a Friend
          </Button>
        </Grid>
        {ADMIN && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/Reports");
              }}
            >
              Reports
            </Button>
          </Grid>
        )}
      </Grid>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          onClick={applyDateFilter}
        >
          Apply
        </Button>
      </div>
      <Divider sx={{ marginTop: 2 }} />

      {users && food && showTable && (
        <FoodTable
          Food={food}
          setFood={setFood}
          Users={users}
          currentUser={currentUser}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddFood
            setOpen={setOpen}
            currentUser={currentUser}
            Food={food}
            setFood={setFood}
            setcalorieAlert={setcalorieAlert}
            setShowTable={setShowTable}
          />
        </Box>
      </Modal>
      <Modal
        open={openInvite}
        onClose={handleCloseInvite}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Invite
            setOpenInvite={setOpenInvite}
            setError={setError}
            setAlert={setAlert}
            setAlertStatus={setAlertStatus}
            setCurrentUser={setCurrentUser}
            setShowTable={setShowTable}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ShowActivity;
