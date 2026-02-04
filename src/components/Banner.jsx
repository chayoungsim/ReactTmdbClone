import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);    
    const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/original/"; // 배너는 고화질!

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`);
                const data = await response.json();
                setMovie(data.results[1]);
                console.log(data.results[1]);

            } catch(error) {
                console.error("데이터로딩실패", error);
            }
        }
        fetchMovie();
    },[])
  if (!movie) return null;

  return (
    <div style={{backgroundImage: `url(${IMG_URL}${movie.backdrop_path})`}} className="banner">
        <div className="banner-text">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <button>상세보기</button>
        </div>
    </div>
  )
}

export default Banner