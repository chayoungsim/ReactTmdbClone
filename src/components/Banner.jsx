import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Banner = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);  
    const [videoKey, setVideoKey] = useState(null);

    const BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/original/"; // 배너는 고화질!

    
    // 1. 인기 영화 데이터 가져오기
    useEffect(() => {
        const fetchBannerMovie = async () => {
            try {
                // 1. 인기 영화 목록 가져오기
                const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR`);
                const data = await response.json();
                //const selectedMovie = data.results?.[1];
                //setMovie(selectedMovie);
                const movies= data.results;

                // 2. 영화 리스트를 돌면서 비디오가 있는 영화 찾기
                for (const movie of movies) {
                    const videoRes = await fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&append_to_response=videos`);
                    const videoData = await videoRes.json();
                    
                    // 유튜브 트레일러 찾기
                    const trailer = videoData.results.find(v => v.site === "YouTube" && v.type === "Trailer");

                    if (trailer) {
                        // 영상이 있는 영화를 찾으면 상태에 저장하고 반복문 종료!
                        setMovie(movie);
                        setVideoKey(trailer.key);
                        return; // 함수 종료
                    }
                }

            } catch(error) {
                console.error("데이터로딩실패", error);
            }
        }
        fetchBannerMovie();
    },[])


    // 2. 선택된 영화의 비디오 키 가져오기
    // useEffect(() => {
    //        if (!movie) return;           
    //         const fetchVideo = async () => {
    //             try {
    //                 const res = await fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
    //                 const data = await res.json();
    //                 // Trailer이면서 YouTube인 영상 찾기
    //                 const trailer = data.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
    //                 if (trailer) {
    //                     setVideoKey(trailer.key);
    //                 } else {
    //                     setVideoKey(null); // 트레일러가 없으면 null 유지
    //                 }
    //             } catch (error) {
    //                 console.error("비디오 로딩 실패", error);
    //             }             
    //         }
    //         fetchVideo();
    // },[movie])

// 로딩 중일 때 처리
  if (!movie) return <div>로딩중...</div>

  return (
    <div className="banner">
        <VideoWrapper>
            {videoKey ? (
                <YouTube
                videoId={videoKey}
                opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                    autoplay: 1,      // 자동 재생
                    loop: 1,          // 반복 재생
                    mute: 1,          // 음소거 (자동 재생 필수 조건)
                    controls: 0,      // 컨트롤러 숨김
                    modestbranding: 1, // 유튜브 로고 최소화
                    playlist: videoKey, // 반복 재생을 위해 플레이리스트에 자기 자신 추가
                    origin: window.location.origin,
                },
                }} />
            ) : (
                <div className="banner-bg" style={{backgroundImage: `url(${IMG_URL}${movie.backdrop_path})`}}></div>
            )}
        </VideoWrapper>
        <div className="banner-text">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <button onClick={() => navigate(`/movie/${movie.id}`)}>상세보기</button>
        </div>
    </div>
  )
}


const VideoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none; /* 클릭 방지 */

    div {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

    }

    iframe {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%) scale(1.4);
    }`;

export default Banner