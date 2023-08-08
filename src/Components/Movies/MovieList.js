import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import star from "../../Images/star.png";
import { api_key, fetchDataFromServer } from "../../Api";

function MovieList() {
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get("genre");

  const [movieList, setMovieList] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  useEffect(() => {
    if (genreId) {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
        handleGenreData
      );
      fetchDataFromServer(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genreId}`,
        handleMovieData
      );
    }
  }, [genreId]);

  useEffect(() => {
    setMovieList([]);
    setIsInitialLoaded(false);
    setTotalPages(0);
    setCurrentPage(1);
  }, [genreId]);

  const handleGenreData = function (data) {
    const genre = data.genres.find((genre) => genre.id === parseInt(genreId));
    if (genre) {
      setGenreName(genre.name);
    }
  };

  const fetchDataForPage = (page) => {
    if (page > totalPages) {
      return;
    }

    setIsLoading(true);

    fetchDataFromServer(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}`,
      handleMovieData
    );
  };
 

  const handleMovieData = function ({ results, total_pages }) {
    if (!isInitialLoaded) {
      setMovieList(results);
      setIsInitialLoaded(true);
    } else {
      setMovieList((prevMovieList) => [...prevMovieList, ...results]);
    }
    setTotalPages(total_pages);
    setIsLoading(false);
  };

  // Loading functionality

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchDataForPage(nextPage);
    setCurrentPage(nextPage);
  };

  console.log(movieList)

  return (
    <section className="movie-list genre-list">
      <div className="title-wrapper">
        <h1 className="heading">All {genreName} Movies</h1>
      </div>
      <div className="grid-list">
        {movieList.map((movie, index) => (
          <div key={index} className="movie-card movie-card-small">
            <figure className="poster-box card-banner">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-cover"
              />
            </figure>
            <h4 className="title">{movie.title}</h4>
            <div className="meta-list">
              <div className="meta-item">
                <img
                  src={star}
                  alt="rating"
                  width="20"
                  height="20"
                  loading="lazy"
                />
                <span className="span">{movie.vote_average}</span>
              </div>
              <div className="card-badge">{movie.release_date.slice(0, 4)}</div>
            </div>
            <Link
              to={`/details/${movie.id}`}
              className="card-btn"
              title={movie.title}
            ></Link>
          </div>
        ))}
      </div>
      <button
        className={`btn load-more ${isLoading ? "loading" : ""}`}
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </section>
  );
}

export default MovieList;
