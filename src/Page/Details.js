import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import YouMayalsoLike from "../Components/Movies/YouMayalsoLike"
import MovieDetails from '../Components/MovieDetails/MovieDetails'

function Details() {
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
    <MovieDetails/>
    <YouMayalsoLike />
  </div>
  )
}

export default Details