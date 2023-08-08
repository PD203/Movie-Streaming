import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Images/icon.png";
import search from "../../Images/search.png";
import close from "../../Images/close.png";
import menuclose from "../../Images/menu-close.png";
import menu from "../../Images/menu.png";
import "./header.css";
import { api_key, fetchDataFromServer } from "../../Api";

function Header({
  isActive,
  handleToggleClick,
  handleSidebarClick,
  handleSearchQuery ,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  let searchTimeout;

  const handleSearchInput = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (query.trim()) {
        handleSearchQuery(query); 
      }
    }, 500);
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        <img src={Logo} width="60" height="32" alt="Flicks home" />
        CINESCOPE
      </Link>
     
      <button className="menu-btn" onClick={handleSidebarClick}>
        <img
          src={menu}
          width="24"
          height="24"
          alt="open-menu"
          className={`open ${isActive ? "" : ""}`}
        />
      </button>
    </div>
  );
}

export default Header;
