import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox.jsx';


const Header = () => {
  return (
    <header>
        <div className="nav">
            <h1>
                <Link to="/" className="logo">Netflix</Link>
            </h1>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/homepage" className="nav-link">HomePage</Link>
                <Link to="/movies" className="nav-link">Movies</Link>
            </nav>
        </div>
        <div className="aside">
            <SearchBox />
            {/* <button type="button">로그인</button> */}
        </div>
    </header>
  )
}

export default Header