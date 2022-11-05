import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ReportTable from "../helper/ReportTable";
import config from "../../config";

function AddedEntries() {
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const entityReport = async () => {
    const url = `${config.BASEURL}/entityReport`;

    return axios
      .get(url)
      .then((res) => {
        setFilteredProducts(res.data.filteredFood);
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log("Error occured at entityReport", error);
      });
  };

  useEffect(() => {
    entityReport();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {filteredProducts && users && (
            <ReportTable
              title={"Data for this Week"}
              FilteredFood={filteredProducts.filteredSevenFood}
              users={users}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {filteredProducts && users && (
            <ReportTable
              title={"Data for the Previous Week"}
              FilteredFood={filteredProducts.filteredWeekFood}
              users={users}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default AddedEntries;
