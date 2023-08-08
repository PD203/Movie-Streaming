import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Search from "../Components/Search/Search";

function SearchResults() {
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
      <Search />
    </div>
  );
}

export default SearchResults;
