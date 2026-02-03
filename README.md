#  영화 정보 큐레이션 사이트 (Netflix/TMDB 클론)
핵심 기술: React Router의 심화 활용, 스와이퍼(Swiper.js) 커스텀, 영화 예고편 팝업(유튜브 연동).
학습 포인트:  **'필터링'과 '슬라이딩 인터랙션'**이 핵심입니다.
추천 API: TMDB API (무료이며 문서화가 아주 잘 되어 있음)

## 설치
```bash
npm create vite@latest .(현재폴더에 설치)

```
[TMDB](https://www.themoviedb.org/) 

.env 파일생성 API_KEY 관리
VITE_UNSPLASH_ACCESS_KEY=API_KEY
axios.get : client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,

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
try {
    setLoading(true)
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`)
    
} catch(err) {

} finally {
    setLoading(false)
}
```

### CSS-in-JS(Styled-components)
$ npm install styled-components