import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search.jsx";
import HourlyWeather from "./components/HourlyWeather.jsx";
import Home from "./Home.jsx";
import About from './components/About.jsx'

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showWeather, setShowWeather] = useState(false);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setShowWeather(false); 
  };

  const handleSearch = () => {
    setShowWeather(true);
  };

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route 
            path="/weather" 
            element={
              <>
                <Search handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
                {showWeather ? (
                  <HourlyWeather cityName={searchValue} />
                ) : (
                  <div className="start">Search for a location...</div>
                )}
              </>
            } 
          />
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
  );
}

export default App;
