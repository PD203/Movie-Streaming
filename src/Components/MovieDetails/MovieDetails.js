import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./moviedetails.css";
import star from "../../Images/star.png";
import { api_key } from "../../Api";

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const movieId = location.pathname.split("/")[2];
    if (movieId) {
      fetchDataForMovie(movieId);
    }
  }, [location]);

  const fetchDataForMovie = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=credits,videos`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const movie = await response.json();

      setMovieDetails(movie);
      document.title = `${movie.title} - CineScope`;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="movie-detail">
      {movieDetails && (
        <>
          <div
            className="backdrop-image"
            style={{
              background: `url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path})`,
            }}
          ></div>
          <figure className="poster-box movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`}
              className="img-cover"
              alt={movieDetails.title}
            />
          </figure>
          <div className="detail-box">
            <div className="detail-content">
              <h1 className="heading">{movieDetails.title}</h1>
              <div className="meta-list">
                <div className="meta-item">
                  <img src={star} width="20" height="20" alt="rating" />
                  <span className="span">{movieDetails.vote_average}</span>
                </div>
                <div className="separator"></div>
                <div className="meta-item">{movieDetails.runtime}m</div>
                <div className="separator"></div>
                <div className="meta-item">{movieDetails.release_date}</div>
                <div className="meta-item card-badge">
                  {movieDetails.certification}
                </div>
                <p className="genre">
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="overview">{movieDetails.overview}</p>
                <ul className="detail-list">
                  <div className="list-item">
                    <p className="list-name">Starring</p>
                    <p>
                      {movieDetails.credits.cast
                        .map((actor) => actor.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="list-item">
                    <p className="list-name">Directed By</p>
                    <p>
                      {movieDetails.credits.crew
                        .filter((person) => person.job === "Director")
                        .map((director) => director.name)
                        .join(", ")}
                    </p>
                  </div>
                </ul>
              </div>
            </div>
            <div className="title-wrapper">
              <h3 className="title-large">Trailers and clips</h3>
            </div>
            <div className="slider-list">
              <div className="slider-inner">
                {movieDetails.videos.results.map((video) => (
                  <div key={video.key} className="video-card">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-link"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                        alt={`${video.name} Poster`}
                        className="video-poster"
                      />
                      {video.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
