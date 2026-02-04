import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const SearchBox = () => {
   const [searchValue, setSearchValue] = useState("");
   const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
        console.log(e.target.value);    
    }

  return (
    <div>
        <SearchInput type="text" value={searchValue} onChange={handleChange} placeholder="영화를 검색하세요." />
    </div>
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