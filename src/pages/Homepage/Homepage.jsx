import React from 'react'
import Banner from "./components/Banner.jsx";
import PopularMovieSlide from "./components/PopularMovieSlide.jsx";
import TopLatedMoviesSlide from "./components/TopLatedMoviesSlide.jsx";
import UpcommingMovieSlider from "./components/UpcommingMovieSlider.jsx";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopLatedMoviesSlide />
      <UpcommingMovieSlider />
    </div>
  )
}

export default Homepage