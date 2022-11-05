import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import config from "../../config";
import CustomAlert from "../helper/Alert";

function AddFood(props) {
  const { currentUser, setcalorieAlert ,setShowTable } = props;
  const BASEURL=config.BASEURL

  const [food, setFood] = useState(
    props?.option === "edit" ? props?.entity?.Food : ""
  );
  const [calorie, setCalorie] = useState(
    props?.option === "edit" ? props?.entity?.Calorie : ""
  );
  const [error, setError] = useState(false);
  const AddUserEntity = async () => {

    const url = `${BASEURL}/addfood`;
    return axios
      .post(url, {
        id: currentUser._id,
        token: currentUser.Token,
        food: food,
        calorie: calorie,
      })
      .then((res) => {
        setShowTable(true)
        const appendFood = res.data.data;
        setcalorieAlert(appendFood.createdAt);
        props?.setFood({ ...props.Food, [appendFood._id]: appendFood });
        props?.setOpen(false);
      })
      .catch((e) => {
        setError(true);
        console.log("Error occured at AddUserEntity", error);
      });
  };

  const AdminAdd = async () => {

    const url = `${BASEURL}/addfood/adminAdd`;
    return axios

      .post(url, {
        id: props?.entity.UserID,
        token: props?.entity.Token,
        food: food,
        calorie: calorie,
      })
      .then((res) => {
    const appendFood = res.data.data;
        props?.setFood({ ...props.Food, [appendFood._id]: appendFood });
        props?.setOpen(false);
      })
      .catch((e) => {
        console.log("Error occured at AdminAdd", error);
      });
  };

  const AdminEdit = async () => {
    const url = `${BASEURL}/addfood/adminEdit`;
    return axios
      .post(url, {
        id: props?.entity._id,
        food: food,
        calorie: calorie,
      })
      .then((res) => {
        const appendFood = res.data.data;
        const filteredData = Object.values(props?.Food).filter(
          (FoodItem) => FoodItem._id !== appendFood._id
        );

        props?.setFood({ ...filteredData, appendFood });
        props?.setOpen(false);
      })
      .catch((e) => {
        setError(true);
        console.log("Error occured at AdminEdit", error);
      });
  };

  const handleDelete = async () => {
    const url = `${BASEURL}/addfood/adminDelete`;
    return axios
      .post(url, {
        id: props?.entity._id,
      })
      .then((res) => {

        const filteredData = Object.values(props?.Food).filter(
          (FoodItem) => FoodItem._id !== props?.entity._id
        ); 
        props?.setFood({ ...filteredData });

        props?.setOpen(false);
      })
      .catch((e) => {
        setError(true);
        console.log("Error occured at handleDelete", error);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props?.option === "add" && AdminAdd();
        props?.option === "edit" && AdminEdit();
        !props?.option && AddUserEntity(); 
      }}
    >
        
      {
        error && <CustomAlert error ={'Unable to add Item! Try Again error'} />
      }
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add Food
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            size="small"
            fullWidth
            type=""
            id="outlined-required"
            label="Required"
            placeholder="banana,apple,meat.."
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add Calorie
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <TextField
            required
            type="number"
            size="small"
            fullWidth
            id="outlined-required"
            label="Required"
            InputProps={{
              inputProps: { min: 0 },
            }}
            value={calorie}
            onChange={(e) => setCalorie(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          {props?.option === "edit" && (
            <Button variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Stack>
      </Grid>
    </form>
  );
}

export default AddFood;
