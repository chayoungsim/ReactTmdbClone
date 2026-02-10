import React from 'react'
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies.js";
import "./Banner.scss";

const Banner = () => {
  const {data, isLoading, isError, error} = usePopularMoviesQuery();
  console.log("ddd",data);
  if(isLoading) {
    <h2>Loading...</h2>
  }
  if(isError) {
    <h2>{error.message}</h2>
  }
  return (
    <div className="topBanner">
      <div className="bg">
        <img src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.results[0].poster_path}`} alt="${data.results[0].title}" />
      </div>
      <div className="desc">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner