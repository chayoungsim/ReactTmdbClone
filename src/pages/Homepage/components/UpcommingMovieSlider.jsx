import React from 'react';
import {useUpcommingMoviesQuery} from "../../../hooks/useUpcommingMovies.js";
import MovieSlider from "../../../common/MovieSlider.jsx";
import {responsive} from "../../../constants/responsive.js";

const UpcommingMovieSlider = () => {

    const {data, isLoading, isError, error} = useUpcommingMoviesQuery();
    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            <MovieSlider
                title="Upcomming Movies"
                movies={data.results}
                responsive={responsive}
            />
        </div>
    );
};

export default UpcommingMovieSlider;