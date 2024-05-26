import React, { useState } from 'react'
import './search.css'
import searchImage from '../assests/magnifying-glass.png';
import locationImage from '../assests/location-pin.png';


const Search = ({handleSearchChange,handleSearch}) => {
    const [searchInput, setSearchInput] = useState('')

    const handleChange=(e)=>{
        const value = e.target.value;
        setSearchInput(value)        
    }

    const handle=()=>{
        handleSearchChange(searchInput)
        handleSearch()
    }


  return (
    <div className='search' >
      <img id='locationImg' src={locationImage} alt="locationIcon" />
        <input id='city' type="text"
         value={searchInput}
         onChange={handleChange} />

   <a id='button'  onClick={handle}><img id='searchImg' src={searchImage} alt="Search" /></a>
    </div>
  )
}

export default Search