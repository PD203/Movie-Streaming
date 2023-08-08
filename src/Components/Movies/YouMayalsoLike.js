import React, { useEffect, useState } from 'react';
import "./movies.css";
import star from "../../Images/star.png";
import { Link, useLocation } from 'react-router-dom';
import { api_key, fetchDataFromServer } from "../../Api";



function YouMayAlsoLike() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchRecommendedMovies = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRecommendedMovies(data.results);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    const movieId = location.pathname.split("/")[2];
    if (movieId) {
      fetchRecommendedMovies(movieId);
    }
  }, [location]);

  return (
    <section className='movie-list'>
      <div className='title-wrapper'>
        <h3 className='title-large'>You May Also Like</h3>
      </div>
      <div className='slider-list'>
        <div className='slider-inner'>
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className='movie-card '>
              <figure className='poster-box card-banner'>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  className='img-cover'
                />
              </figure>
              <h4 className='title'>{movie.title}</h4>
              <div className='meta-list'>
                <div className='meta-item'>
                  <img src={star} alt='rating' width="20" height="20" loading='lazy'/>
                  <span className='span'>{movie.vote_average}</span>
                </div>
                <div className='card-badge'>{movie.release_date}</div>
              </div>
              <Link to={`/details/${movie.id}`} className='card-btn' title={movie.title}></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouMayAlsoLike;
