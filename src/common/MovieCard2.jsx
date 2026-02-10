import React from 'react';
import "./MovieCard2.scss"
import {Link} from "react-router-dom";

const MovieCard2 = ({movie}) => {

    const truncateToOne = (num) => Math.trunc(num*10) / 10;

    return (
        <Link to={`/movie/${movie.id}`} className="MovieCard2">
            <div className="img">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_face${movie.poster_path}`} alt={movie.title}/>
            </div>
            <div className="desc">
                <h3>{movie.title}</h3>
                <p className="date">{movie.release_date}</p>
                <span className="vote">{truncateToOne(movie.vote_average)}</span>
            </div>
        </Link>
    );
};

export default MovieCard2;