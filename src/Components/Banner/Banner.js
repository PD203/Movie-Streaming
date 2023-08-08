import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import play from "../../Images/play_circle.png";
import "./banner.css";
import { api_key, fetchDataFromServer } from "../../Api";

function Banner() {
  const [movieList, setMovieList] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
      heroBanner
    );
  }, []);

 
  const heroBanner = function ({ results: movielist }) {
    setMovieList(movielist);
  };

  const handleSlideControlClick = (index) => {
    setActiveSlideIndex(index);
  };

  const getMovieDetails = (movieId) => {
    window.localStorage.setItem("movieId", String(movieId));
  };

  return (
    <article className="container" page-content>
      <section className="banner" aria-label="popular movies">
        <div className="banner-slider">
          {movieList.map((movie, index) => (
            <div
              key={index}
              className={`slider-item ${
                index === activeSlideIndex ? "active" : ""
              }`}
              slider-item
            >
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                alt={movie.title}
                className="img-cover"
                loading="eager"
              />
              <div className="banner-content">
                <h2 className="heading">{movie.title}</h2>
                <div className="meta-list">
                  <div className="meta-item">{movie.release_date}</div>
                  <div className="meta-item card-badge">
                    {movie.vote_average}
                  </div>
                </div>
                <p className="banner-text">{movie.overview}</p>
                <Link
                  to={`/details/${movie.id}`}
                  className="btn"
                  onClick={() => getMovieDetails(movie.id)}
                >
                  <img
                    src={play}
                    alt="play circle"
                    aria-hidden="true"
                    width="24"
                    height="24"
                  />
                  <span className="span">Watch Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-control ">
          <div className="control-inner">
            {movieList.map((movie, index) => (
              <button
                key={index}
                className={`poster-box slider-item ${
                  index === activeSlideIndex ? "active" : ""
                }`}
                slider-control={index}
                onClick={() => handleSlideControlClick(index)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                  alt={`slide to ${movie.title}`}
                  loading="lazy"
                  draggable="false"
                  className="img-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Banner;
