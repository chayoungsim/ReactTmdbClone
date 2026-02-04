import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MovieModal from "./MovieModal.jsx";
import MovieCard from "./MovieCard.jsx";

// 1. Swiper 리액트 컴포넌트 및 스타일 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const MovieRow = ({title, category}) => {
    

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const [movies, setMovies] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const swiperRef = useRef(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);


    const handleMovieClick = (movie) => {
        setselectedMovie(movie);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'
    };

    const handleCloseModal = () => {        
        setIsModalOpen(false);
        setselectedMovie(null);
        document.body.style.overflow = 'auto'
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=ko-KR`,
                );
                const data = await response.json();

                // 2. slice(0, 10)을 사용해 상위 10개만 가져오기
                setMovies(data.results.slice(0, 10));
                console.log(data.results);
            } catch (error) {
                console.error("데이터로딩실패:", error);
            }
        };
        fetchMovies();
    }, [category]);

    const handleSlideChange =(swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }

  return (
    <div className="movie-lists-wrap">
        <h2>{title}</h2>
        <div className="movieLists">
            {!isBeginning && (<button onClick={() => swiperRef.current?.slidePrev()} className="prev-button">Prev</button>)}    
            <Swiper
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    // 스와이퍼가 초기화될 때 리모컨에 실제 인스턴스를 연결
                    swiperRef.current = swiper;

                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={handleSlideChange}
                spaceBetween={10} // 슬라이드 사이 간격
                slidesPerView={'auto'} // 한 번에 보여줄 카드 개수  
            >
                {movies.map((movie) => (   
                    <SwiperSlide key={movie.id}>                       
                        <MovieCard movie={movie} onClick={() => {handleMovieClick(movie)}}/>    
                    </SwiperSlide>                       
                ))}
            </Swiper> 
             {!isEnd && (<button onClick={() => swiperRef.current?.slideNext()} className="next-button">Next</button>)}
            
        </div>  
        {isModalOpen && selectedMovie && (
            <Overlay onClick={handleCloseModal}>                      
                <MovieModal selectedMovie={selectedMovie} handleCloseModal={handleCloseModal} />
            </Overlay>
        )}
    </div>
  )
}

//modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default MovieRow
