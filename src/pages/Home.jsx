import "../App.css";
import Banner from "../components/Banner.jsx";
import MovieRow from "../components/MovieRow.jsx";



function Home() {
   
    return (       
        <main>    
            <Banner /> 
            <div className="contents">                
                <MovieRow title="지금 뜨는 콘텐츠" category="popular" />    
                <MovieRow title="Top Rated" category="top_rated" />  
                <MovieRow title="now_playing" category="now_playing" />
                <MovieRow title="Upcoming" category="upcoming" />
            </div>  
        </main>
    );
}

export default Home;
