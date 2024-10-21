import { useState,useEffect } from 'react';
import './App.css'
import axios from "axios";

function App() {

 const [city, setCity] = useState('kochi');
 const [weatherData, setWeatherData] = useState(null);
 const [weatherIcon,setWeatherIcon]=useState(null)
 const [mainIcon,setMainIcon]=useState(null)


 const fetchData = async () => {
   try {
     const response = await axios.get(
       `https://api.weatherapi.com/v1/forecast.json?key=278819deaeeb496b94f54313241710&q=${city}&days=7`
     );
     setWeatherData(response.data);
     console.log(response.data); 
   } catch (error) {
     console.error(error);
   }
 };


 const getWeatherIcon =async()=>{
  try {
    const response = await axios.get(
      "https://weathericonserver.onrender.com/weatherIcons/"
    );
    setWeatherIcon(response.data);
    // console.log(response.data); 
    
  } catch (error) {
    console.error(error);
  }
 }

 const handleMainIcon=()=>{
  if(weatherData?.current.condition.text=="Sunny"){
    setMainIcon(weatherIcon?.find(item=>(item.text=="Sunny")).url)
   }
   else if(weatherData?.current.condition.text=="Clear"){
    setMainIcon(weatherIcon?.find(item=>(item.text=="Clear")).url)
   }
   else { if(weatherData?.current.is_day==1)
    {setMainIcon(weatherIcon?.find(item=>(item.text==weatherData?.current.condition.text.trimEnd()))?.day)}
    else{
      setMainIcon(weatherIcon?.find(item=>(item.text==weatherData?.current.condition.text.trimEnd()))?.night)
    }}
 }


 

 useEffect(()=>{
  handleMainIcon()
 },[weatherData,weatherIcon])


 useEffect(() => {
   fetchData();
   getWeatherIcon()
 }, []);

 const handleSearch = (e) => {
   e.preventDefault();
   setCity(e.target.value)
   fetchData();   
   getWeatherIcon()

 };
 

  return (
    <>
    <div className='bg'>
    <div className='bg-light p-5' style={{width:'30%',borderRadius:'0px 30px 30px 0px'}}>
<div class="input-group">
<i class="fa-solid fa-magnifying-glass search-icon text-secondary"></i>
      <input  type="text" onChange={e=>{handleSearch(e)}} class="input-box rounded-5 ps-5" placeholder="Search for Place"/>
  
  <i class="fa-solid fa-location-dot location-icon text-secondary"></i>
  </div>
  <div className="mt-2">
    <img width={'350px'} src={mainIcon} />
    <h1 className='mt-3'>{weatherData?.current.temp_c}°C</h1>
    <h6 className='my-3'>feels like {weatherData?.current.feelslike_c}°C</h6>
    <div className="d-flex justify-content-between">
      <h5 >{weatherData?.location.name}</h5>
      <h5>{weatherData?.location.region}</h5>
    </div>
    <hr className='rounded'/>
    <p><i class="fa-solid fa-cloud me-3 "></i>{weatherData?.current.condition.text}</p>
    <p><i class="fa-solid fa-clock me-3"></i>{weatherData?.location.localtime}</p>
  </div>
</div>

<div className='ps-5'>
    <h1 style={{fontFamily:"monospace"}} className='fs-1 my-5'>Weather Forecast</h1>
    <div className="d-flex w-100 justify-content-between">
     { 
     weatherData?.forecast.forecastday.map((item,index)=>(
      index!=0 && 
        <div key={index}  className=" effect bg-light m-3 d-flex flex-column  align-items-center p-3 shadow rounded">
        <h6>{item.date}</h6>
{    

item?.day.condition.text=="Sunny" ?
<img width={'100px'} src={weatherIcon?.find(icon=>(icon.text=="Sunny")).url} alt="" />
:
item?.day.condition.text=="Clear" ?
<img width={'100px'} src={weatherIcon?.find(icon1=>(icon1.text=="Clear")).url} alt="" />
:

<img width={'100px'} src={weatherIcon?.find(icon2=>(icon2.text==item?.day.condition.text.trimEnd()))?.day} alt="" />
}        

<h6>{item.day.avgtemp_c}°</h6>
      </div>
     ))
      }
    </div>
    <div className="mt-5 w-100">
      <h3>Today's Highlights</h3>
      <div className='d-flex p-3 w-100'>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>Humidity</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img width={'100px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg" alt="" />
            <h6 className='mt-3'>{weatherData?.current.humidity} %</h6>
          </div>
        </div>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>Wind Status</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img width={'100px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/wind.svg" alt="" />
            <h6 className='mt-3'>{weatherData?.current.wind_kph	} km/h</h6>
          </div>
        </div>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>Precipitation</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
          <img width={'100px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/raindrops.svg" alt="" />
          <h6 className='mt-3'>{weatherData?.current.precip_mm		} mm</h6>
          </div>
        </div>
        </div>
        <div className='d-flex p-3 w-100'>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>UV</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img width={'100px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg" alt="" />
            <h6 className='mt-3'>{weatherData?.current.uv	} </h6>
          </div>
        </div>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>Visibility</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img width={'100px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg" alt="" />
            <h6 className='mt-3'>{weatherData?.current.vis_km		} km</h6>
          </div>
        </div>
        <div style={{width:'300px'}} className="mx-2  bg-light rounded p-4">
          <p className='text-secondary'>Sunrise & Sunset</p>
          <div className='d-flex flex-column justify-content-center align-items-center'>
           <div className='d-flex justify-content-center align-items-center my-2'> <img width={'50px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg" alt="" /> <p className='ms-2'>{weatherData?.forecast.forecastday[0].astro.sunrise}</p></div>
           <div className='d-flex justify-content-center align-items-center my-2'> <img width={'50px'}  src="https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-night.svg" alt="" /> <p className='ms-2'>{weatherData?.forecast.forecastday[0].astro.sunset}</p></div>

          </div>
        </div>
        </div>
    </div>
  </div>

      </div>
    </>
  )
}

export default App
