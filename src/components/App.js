
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event) => {
    // Update the search query state as the user types
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const apiKey = "99eb9fd1";
    const apiUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          if(data.Response === "True") {
            setMovieResults(data.Search);
            setHasError(false);
          } else {
            setMovieResults([]);
            setHasError(true);
          }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMovieResults([]);
        setHasError(true);
      });
  };



  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        {/* Search Section */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Search Movie
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            />
            <button onClick={handleSearchClick} style={{ marginLeft: "5px" }}>
              Search
            </button>
        </div>

        {/* Results Section */}
        {hasError === true && (
          <p className="error">Invalid movie name. Please try again.</p>
        )}

        {hasError === false && movieResults.length > 0 && (
          <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginTop: "20px" }}>
            {movieResults.map((movieItem) => (
              <li key={movieItem.imdbID} style={{ marginBottom: "20px" }}>
                <h2>{movieItem.Title} ({ movieItem.year })</h2>
                <img
                  src={movieItem.Poster}
                  alt={movieItem.Title}
                  style={{ width: "200px"}}
                  />

              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default App
