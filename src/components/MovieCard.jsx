import styled from 'styled-components';

// 스타일도 함께 이동시켜서 캡슐화(Encapsulation)합니다.
const Card = styled.div`    
    width: 21.4rem;
    height: 30rem;
    background: rgb(35, 35, 35);
    border: none;
    border-radius: 0.5rem;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  p {
    margin-top: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    color: white;
    /* 제목이 길어질 경우를 대비한 말줄임 처리 (퍼블리셔의 감각!) */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    transform: scale(1.05);
  }
`;



const MovieCard = ({movie, onClick}) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Card key={movie.id} onClick={onClick}>
        <img src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        {/* <p>{movie.title}</p> */}
    </Card>
  )
}

export default MovieCard