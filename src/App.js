import React, {useState} from 'react';
const api = {
    key: 'a6fbcbd455a0066c7a0b8ee1966784de',
    base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {
    const dateBuild = (d) => {
        let date = String(new window.Date());
        date = date.slice(3,15);
        return date;
    }
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res=>res.json())
            .then((result) => {
                setWeather(result);
                setQuery('');
                console.log(result);
            })
        }
    }
    return(
        <div className="App">
            <div className="search-container">
                <input className="search-bar" type="text" placeholder="Enter city name" value={query} onChange={(e) => {setQuery(e.target.value)}} onKeyPress={search}/>
            </div>
            {(typeof weather.main !="undefined") ? (
            <div>
                <div className="location-container">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuild(new Date())}</div>
                </div>
                <div className="weather-container">
                    <div className="temperature">{weather.main.temp}&deg;C</div>
                    <div className="weather">{weather.weather[0].main}</div>
                </div>
            </div>
            ) : ("")}
        </div>
    )
}
export default App;