import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import config from "../../config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { generateNewToken } from "../helper/GenerateNewToken";
function Invite(props) {
  const { setError, setAlert, setAlertStatus } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAlert = (isAlert, errorMessage, status) => {
    setAlert(isAlert);
    setError(errorMessage);
    setAlertStatus(status);
  };
  
  const sendreq = async (name, email) => {
    const url = `${config.BASEURL}/users`;
    return axios
      .post(url, {
        token: generateNewToken(),
        username: name,
        email: email,
      })
      .then((res) => {
        handleAlert(true, "Friend Invited Successfully", "success");
        props.setOpenInvite(false);
      })
      .catch((e) => {
        handleAlert(true, "Error Occuerd in Invite", "error");
      });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //API call
        sendreq(name, email);
      }}
    >
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            size="small"
            fullWidth
            id="outlined-required"
            label="Required"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: 2 }}>
          <TextField
            required
            size="small"
            type="email"
            fullWidth
            id="outlined-required"
            label="Required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Invite;
