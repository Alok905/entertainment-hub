import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { green, purple } from "@mui/material/colors";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const nav = useNavigate();

  React.useEffect(() => {
    if (value === 0) {
      nav("/");
    } else if (value === 1) {
      nav("/movies");
    } else if (value === 2) {
      nav("/series");
    } else if (value === 3) {
      nav("/search");
    }
  }, [value]);

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 1,
          position: "fixed",
          bottom: 0,
          zIndex: 100,
        }}
      >
        <BottomNavigation
          sx={{ padding: 5 }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            style={{ color: "white" }}
            label="Trending"
            icon={<WhatshotIcon style={{ fontSize: "35px" }} />}
          />
          <BottomNavigationAction
            style={{ color: "white" }}
            label="Movies"
            icon={<MovieCreationIcon style={{ fontSize: "35px" }} />}
          />
          <BottomNavigationAction
            style={{ color: "white" }}
            label="TV Series"
            icon={<TvOutlinedIcon style={{ fontSize: "35px" }} />}
          />
          <BottomNavigationAction
            style={{ color: "white" }}
            label="Search"
            icon={<SearchIcon style={{ fontSize: "35px" }} />}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}
