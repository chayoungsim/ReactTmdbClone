import React from 'react';
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies.js";
import MovieSlider from "../../../common/MovieSlider.jsx";
import { responsive } from "../../../constants/responsive.js";
import "./PopularMovieSlider.scss";

const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }


    return (
        <div>
            <MovieSlider
                title="Popular Movies"
                movies={data.results}
                responsive={responsive}
            />
        </div>
    );
};

export default PopularMovieSlide;