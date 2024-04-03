import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Debouncing effect for the search term
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setTitle(searchTerm);
    }, 100); // 500 milliseconds delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fetch movies with current filters and pagination settings
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies`, {
          params: { page, limit, title },
        });
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [page, limit, title]);

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Filter by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} - {movie.year}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default MoviesList;
