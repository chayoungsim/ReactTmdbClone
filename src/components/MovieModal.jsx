import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const ModalContent = styled.div`    
  background-color: #1a1a1a;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  color: white;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .info {
    padding: 20px;
    h2 { margin-bottom: 10px; }
    p { line-height: 1.6; color: #ccc; }
    .rating { color: #ffc107; font-weight: bold; margin-bottom: 10px; }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;



const MovieModal = ({selectedMovie, handleCloseModal}) => {
    const navigate = useNavigate();
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    if (!selectedMovie) return null;

    const gotoDetail = () => {
        navigate(`/movie/${selectedMovie.id}`);
        handleCloseModal();
    }


  return (
    <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>  
        <img 
            src={selectedMovie.backdrop_path 
            ? `${IMG_BASE_URL}${selectedMovie.backdrop_path}` 
            : "기본_이미지_경로"} 
            alt={selectedMovie.title} 
        />
        <div className="info">
            <h2>{selectedMovie.title}</h2>
            <p>
                <span>평점: ⭐ {selectedMovie.vote_average.toFixed(1)}</span>
            </p>
            <div className="overview">{selectedMovie.overview || "상세 설명이 준비되지 않았습니다."}</div>
            <button onClick={gotoDetail}>상세보기</button>
        </div>
    </ModalContent>
  )
}

export default MovieModal