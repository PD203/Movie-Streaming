import React, { useEffect, useState } from "react";
import { api_key, fetchDataFromServer } from "../../Api";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ isActive }) {
  const [genrelist, setGenreList] = useState({});

  useEffect(() => {
    fetchDataFromServer(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
      ({ genres }) => {
        const updatedGenreList = {};
        for (const { id, name } of genres) {
          updatedGenreList[id] = name;
        }
        setGenreList(updatedGenreList);
      }
    );
  }, []);

  return (
    <nav className={`sidebar ${isActive ? 'active' : ""}`}>
      <div className="sidebar-inner">
        <div className="sidebar-list">
          <p className="title">Genre</p>
          {Object.entries(genrelist).map(([genreId, genreName]) => (
            <Link
              key={genreId}
              to={`/movie-list?genre=${genreId}`}
              menu-close="true"
              className="sidebar-link"
            >
              {genreName}
            </Link>
          ))}

         
        </div>

        <div className="overlay"></div>
      </div>
    </nav>
  );
}

export default Sidebar;
