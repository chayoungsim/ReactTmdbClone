import { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}



const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    // 검색어에 디바운스 적용 (0.5초 대기)
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        } else {
            navigate("/");
        }
    },[debouncedSearchTerm, searchTerm, navigate])

    const fetchSearchMovie = async (term) => {
        try {
            const res = await axios.get(`/search/movie?query=${term}`);
            setSearchResults(res.data.results);
        } catch (error) {
            console.log("검색 에러:", error);
        }
    };



  return (
    <div className="search-page">
        {searchResults.length > 0 ? (
            <div className="result-lists">
                {searchResults.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)} />
                ))}
            </div>
        ) : (
            <div>"{searchTerm}"에 대한 검색 결과가 없습니다.</div>
        )}
    </div>
  )
}

export default SearchPage