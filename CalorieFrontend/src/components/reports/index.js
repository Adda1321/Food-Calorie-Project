import { Button } from "@mui/material";
import React from "react";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";

const THEME = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 14,
    poster: {
      color: "red",
    },
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function Reports() {
  return (
    <ThemeProvider theme={THEME}>
      <div style={{ marginLeft: 15, marginRight: 15 }}>
        <nav style={{ marginTop: 20, marginBottom: 20 }}>
          <Link
            to="addEntries"
            style={{ textDecoration: "none", marginRght: 5 }}
          >
            <Button variant="outlined">Entries</Button>
          </Link>
          <Link
            to="averageCalorie"
            style={{ textDecoration: "none", marginLeft: 5 }}
          >
            <Button variant="outlined"> Calories</Button>
          </Link>
        </nav>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default Reports;
