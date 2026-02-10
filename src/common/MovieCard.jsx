import React from 'react';
import "./MovieCard.scss";
import {useMovieGenreQuery} from "../hooks/useMovieGenre.js";

const MovieCard = ({movie}) => {
    const {data:genreData} = useMovieGenreQuery();
    const showGenre =(genreIdList) => {
        if(!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)
            return genreObj.name;
        })
        return genreNameList;
    }
    return (
        <div style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/w300_and_h450_face${movie.poster_path}`+")", backgroundSize: "cover"}} className="MovieCard">
            <div className="MovieCard__desc">
                <h4>{movie.original_title}</h4>
                <p className="badges">{showGenre(movie.genre_ids).map((genre,index) => (
                    <span className="badge" key={index}>{genre}</span>
                ))}</p>
                <div>
                    <div>{movie.release_date}</div>
                    <div>{movie.vote_average}</div>
                    <div>{movie.popularity}</div>
                    <div>{movie.adult ? "over18" : "under18"}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;