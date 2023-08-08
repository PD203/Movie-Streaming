import React, { useState } from 'react';
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Banner from "../Components/Banner/Banner";
import Movies from "../Components/Movies/Movies";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen((prevState) => !prevState);
     setIsActive(false); 
  };

  return (
    <div>
      <Header
        isActive={isActive}
        handleToggleClick={handleToggleClick}
        handleSidebarClick={handleSidebarClick} 
      />
      <Sidebar isActive={isSidebarOpen} /> 
      <Banner />
      <Movies />
    </div>
  );
}

export default Home;
