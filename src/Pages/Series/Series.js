import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import useGenres from "../../components/hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNoOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, selectedGenres]);

  return (
    <div className="body">
      <span className="pageTitle">discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={"tv"}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {noOfPages > 1 && (
        <CustomPagination setPage={setPage} noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default Series;
