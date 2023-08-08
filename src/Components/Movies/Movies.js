import React, { useEffect, useState } from "react";
import "./movies.css";
import star from "../../Images/star.png";
import { Link } from "react-router-dom";
import { api_key } from "../../Api";

function fetchDataFromServer(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
}

function Movies() {
  const [movieSections, setMovieSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const homePageSections = [
      { title: "Upcoming Movie", path: "/movie/upcoming" },
      { title: "Weekly Trending Movies", path: "/trending/movie/week" },
      { title: "Top Rated Movies", path: "/movie/top_rated" },
    ];

    const fetchMovieData = async () => {
      try {
        const fetchedData = await Promise.all(
          homePageSections.map(({ title, path }) =>
            fetchDataFromServer(
              `https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`
            ).then((data) => ({ title, data: data.results }))
          )
        );

        setMovieSections(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {movieSections.map(({ title, data }) => (
        <section key={title} className="movie-list" aria-label={title}>
          <div className="title-wrapper">
            <h3 className="title-large">{title}</h3>
          </div>
          <div className="slider-list">
            <div className="slider-inner">
              {data.map((movie, index) => (
                <div key={index} className="movie-card">
                  <figure className="poster-box card-banner">
                    <img
                      src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                      alt="Movie Banner"
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
                    <div className="card-badge">{movie.release_date}</div>
                  </div>
                  <Link
                    to={`/details/${movie.id}`}
                    className="card-btn"
                    title={movie.title}
                  ></Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default Movies;
