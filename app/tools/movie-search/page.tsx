// pages/movie-search.tsx
import { useState } from 'react';

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

const MovieSearch = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
        const data = await response.json();
        setMovies(data.Search);
        setLoading(false);
    };

    return (
        <div>
            <h1>Movie Search</h1>
            <input
                type="text"
                placeholder="Search for a movie"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchMovies}>Search</button>
            {loading && <p>Loading...</p>}
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <h3>{movie.Title} ({movie.Year})</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;
