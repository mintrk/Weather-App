import './App.css';
import {useEffect, useState} from 'react';

function App() {

  // const name = "Tokyo";
  const apiKey = "1dc60f6b231bb74db5750a2267546eb6";
  const [name, setName] = useState("Bangkok");
  const [searchName, setSearchName] = useState("");
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const sendName = (e) =>{

    e.preventDefault();
    setName(searchName);
  }

  //use effect will ask api
  useEffect(()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    fetch(url).then(res=>res.json())
    .then(data=>{
      setCity(data);
      setIsLoading(true);
    })
  },[name])

  const convertTemp = (k)=>{
    return (k-273).toFixed()
  }

  return (
    (isLoading && <div className="App">
        <section>
          <div className = "location">
            <h1 className="city">{city.name}</h1>
            <p className="state">{city.sys.country}</p>
          </div>
          <div className="card">
            <div className="weather">
              <h1>{convertTemp(city.main.temp)}&deg;C</h1>
              <small>max : {convertTemp(city.main.temp_max)}&deg;C, min: {convertTemp(city.main.temp_min)}&deg;C</small>
            </div>
            <div className="info">
              <div className="status">{city.weather[0].main}</div>
              <div className="humidity">Humidity : {city.main.humidity}</div>
              <div className="wind">Wind speed : {city.wind.speed}</div>
            </div>
          </div>
          <div className='search-container'>
          <form className='search' onSubmit={sendName}>
            <label>Country</label>
            <input type="text" placeholder='please input contry name' onChange={(e)=>setSearchName(e.target.value)}/>
            <button type='submit' className="search-btn">Search</button>
          </form>
          </div> 
        </section>
    </div>)
  );
}

export default App;

