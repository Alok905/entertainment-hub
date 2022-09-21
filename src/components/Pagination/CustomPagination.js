import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { color } from "@mui/system";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
const CustomPagination = ({ setPage, noOfPages = 10 }) => {
  const darkTheme = createTheme({
    palette: "dark",
  });

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={noOfPages}
          color="primary"
          onChange={(e) => handlePageChange(e.target.textContent)}
          hidePrevButton
          hideNextButton
          size="large"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
