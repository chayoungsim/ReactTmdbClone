import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox.jsx';


const Header = () => {
  return (
    <header>
        <h1>
            <Link to="/" className="logo">Netflix</Link>
        </h1>
        <div className="aside">
            <SearchBox />
            <button type="button">로그인</button>
        </div>
    </header>
  )
}

export default Header