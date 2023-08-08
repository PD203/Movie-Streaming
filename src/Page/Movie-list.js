import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import MovieList from "../Components/Movies/MovieList";

function Movielist() {
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Header
        isActive={isActive}
        handleToggleClick={handleToggleClick}
        handleSidebarClick={handleSidebarClick}
      />
      <Sidebar isActive={isSidebarOpen} />
      <MovieList
       
      />
    </div>
  );
}

export default Movielist;
