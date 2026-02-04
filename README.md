#  영화 정보 큐레이션 사이트 (Netflix/TMDB 클론)
- 핵심 기술: React Router의 심화 활용, 스와이퍼(Swiper.js) 커스텀, 영화 예고편 팝업(유튜브 연동).
- 학습 포인트:  **'필터링'과 '슬라이딩 인터랙션'**이 핵심입니다.
- 추천 API: TMDB API (무료이며 문서화가 아주 잘 되어 있음)
- search 기능
- 로그인 기능

## 설치
```bash
npm create vite@latest .(현재폴더에 설치)

```

### API_KEY 
- [TMDB](https://www.themoviedb.org/) : 회원가입 api key생성
```bash
.env 파일생성 API_KEY 관리
VITE_UNSPLASH_ACCESS_KEY= API_KEY
axios.get : client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
```

## React Router
```JavaScript
npm install react-router-dom

// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## 스와이퍼(Swiper.js) 커스텀
```JavaScript
npm install swiper

// 1. Swiper 리액트 컴포넌트 및 스타일 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

```

## 영화 예고편 팝업(유튜브 연동)
```bash
npm install react-youtube

```



### API 사용

```javascript
useEffect(() => {
    // 날씨 정보를 가져오는 함수
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("날씨 정보를 가져오는데 실패했습니다.", error);
      }
    };

    fetchWeather();
  }, []); // []이므로 컴포넌트가 처음 나타날 때 한 번만 실행!
```
```javascript
//axios
//1. axios get 사용
import axios from 'axios';

//2. axios는 데이터가 'data' 속성에 담겨 옵니다.(JSON변환 불필요)

try {
    setLoading(true)
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`)
    
} catch(err) {

} finally {
    setLoading(false)
}
```
```Plaintext
// .env
VITE_TMDB_API_KEY=your_key_here

// axios.js에서 사용 시
params: {
  api_key: import.meta.env.VITE_TMDB_API_KEY,
}
```

### CSS-in-JS(Styled-components)
```bash
$ npm install styled-components
```

### 상세화면
- 단독 페이지 방식 useParams 이용
- 상세화면도 해더 푸터 유지되게 리액트 라우터(react-router-dom)의 Outlet 기능을 사용

