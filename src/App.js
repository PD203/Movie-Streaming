import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Details from "./Page/Details";
import Movielist from "./Page/Movie-list";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:movieId" element={<Details />} />
          <Route path="/movie-list" element={<Movielist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
