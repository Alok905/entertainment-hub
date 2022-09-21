import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );
  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&include_adult=false&page=${page}&query=${searchText}`
    );
    console.log(data.results);
    setContent(data.results);
    setNoOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page, type]);

  //inputProp, InputLabelProps
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="container" style={{ display: "flex" }}>
          <TextField
            className="text-field"
            style={{ flex: 1 }}
            InputProps={{ style: { fontSize: 25 } }}
            InputLabelProps={{ style: { fontSize: 20, color: "white" } }}
            id="filled-basic"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 15, backgroundColor: "white" }}
            onClick={fetchSearch}
          >
            <SearchIcon style={{ fontSize: 50 }} />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          style={{
            marginTop: 30,
          }}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab
            style={{
              width: "50%",
              fontSize: 19,
              fontWeight: "500",
              padding: 25,
            }}
            label="Search Movies"
          />
          <Tab
            style={{ width: "50%", fontSize: 19, fontWeight: "500" }}
            label="Search TV Series"
          />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          content.length == 0 &&
          (type ? (
            <h1 style={{ marginTop: 80, fontSize: 70, boxShadow: "0 0 8px" }}>
              No Series Found
            </h1>
          ) : (
            <h1 style={{ marginTop: 80, fontSize: 70, boxShadow: "0 0 8px" }}>
              No Movie Found
            </h1>
          ))}
      </div>
      {noOfPages > 0 && (
        <CustomPagination setPage={setPage} noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default Search;
