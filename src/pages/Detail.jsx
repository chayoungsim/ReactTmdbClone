import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieRow from '../components/MovieRow.jsx';
import Reviews from '../components/Reviews.jsx';
import axios from '../api/axios.js';

const Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
  
  
    const IMG_URL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {

        // const fetchMovieDetail =  async () => {
        //     const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos,credits`);
        //     const data = await res.json();
        //     setMovie(data);   
        // }
        // fetchMovieDetail();
        // const fetchReviews = async () => {
        //     const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);
        //     const data = await res.json();
        //     setReviews(data.results);
        // }
        // fetchReviews();

        const fetchMovieDetail = async () => {
            try {
                //1. axios get 사용
                const response = await axios.get(`/movie/${id}`, {
                    params: {                        
                        append_to_response: "videos,credits,reviews",
                    }
                })

                //2. axios는 데이터가 'data' 속성에 담겨 옵니다.(JSON변환 불필요)
                setMovie(response.data);
                setReviews(response.data.reviews.results);

            } catch (error){
                console.error("데이터 로딩 실패", error);
            }
        }

        fetchMovieDetail();

    },[id])


    if(!movie) return <div>로딩 중...</div>

  return (
    <DetailContainer>
      {/* 1. 상단 배경 섹션 */}
      <HeroSection bg={`${IMG_URL}${movie.backdrop_path}`}>
        <GradientOverlay />
        <HeroContent>
          <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <InfoText>
            <h1>{movie.title}</h1>
            <div className="meta">
              <span>{movie.release_date.split('-')[0]}</span>
              <span>{movie.runtime}분</span>
              <span className="rating">평점 ⭐ {movie.vote_average.toFixed(1)}</span>
            </div>
            <p className="tagline">{movie.tagline}</p>
            <h3>줄거리</h3>
            <p className="overview">{movie.overview}</p>
          </InfoText>
        </HeroContent>
      </HeroSection>

      {/* 2. 상세 정보 섹션 (추가 데이터) */}
      <div className="detail-info">
        <h2>출연진</h2>
        <div className="cast-list">
          {movie.credits.cast.slice(0, 6).map(person => (
            <div key={person.id} className="card">
              <div className="thumb"><img src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'default_avatar.png'} alt={person.name} /></div>
              <p><strong>{person.name}</strong></p>
              <p className="char">{person.character}</p>
            </div>
          ))}
        </div>        
        <MovieRow title="Related Moview" category="top_rated" /> 
        <h2>Reviews({reviews.length})</h2>
        <Reviews reviews={reviews} />
      </div>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`

`

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  background: url(${props => props.bg}) no-repeat center/cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.8) 20%, transparent 50%),
              linear-gradient(to top, rgba(20,20,20,1), transparent 40%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  padding: 0 5%;
  gap: 40px;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  @media (max-width: 768px) { display: none; } /* 모바일에서 포스터 숨김 */
`;

const InfoText = styled.div`
  color: white;
  max-width: 800px;
  h1 { font-size: 3rem; margin-bottom: 10px; }
  .meta { margin-bottom: 20px; span { margin-right: 15px; color: #aaa; } }
  .tagline { font-style: italic; color: #ffcc00; margin-bottom: 20px; }
  .overview { line-height: 1.6; font-size: 1.1rem; }
`;

export default Detail