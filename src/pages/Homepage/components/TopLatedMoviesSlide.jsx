import React from 'react';
import {useTopRatedMoviesQuery} from "../../../hooks/useTopRatedMovies.js";
import MovieSlider from "../../../common/MovieSlider.jsx";
import {responsive} from "../../../constants/responsive.js";

const TopLatedMoviesSlide = () => {

    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
    if(isLoading) {
        return <h2>Loading...</h2>
    }
    if(isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <MovieSlider
                title="Top Latest Movies"
                movies={data.results}
                responsive={responsive}
            />
        </div>
    );
};

export default TopLatedMoviesSlide;