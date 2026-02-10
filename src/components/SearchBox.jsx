import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const SearchBox = () => {
   const [searchValue, setSearchValue] = useState("");
   const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        //setSearchValue(e.target.value);
        navigate(`/movies?q=${searchValue}`); 
        setSearchValue("");       
    }

  return (
    <form onSubmit={handleChange}>
        {/* <SearchInput type="text" value={searchValue} onChange={handleChange} placeholder="영화를 검색하세요." /> */}
        <SearchInput type="text" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="영화를 검색하세요." />
        <button type="submit">Search</button>
    </form>
  )
}

const SearchInput = styled.input`
 height: 42px;
 border-radius: 0.5rem;
 padding: 0.5rem;
 border:0;
 font-size:1.6rem;
`

export default SearchBox