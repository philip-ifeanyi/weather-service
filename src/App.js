import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/WeatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q:'Lagos'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location'
      toast.info(`fetching data for ${message}`)

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data)

        toast.success(`Data for ${data.name}, ${data.country} successfully fetched!`)
      })
    };
  
    fetchWeather();
  }, [query, units]);


  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const celciusThreshold = units === 'metric' ? 27 : 60;
    const fahrenheitThreshold = units === 'imperial' ? 80.2 : 140;

 
    switch (units) {
      case 'metric':
        if (weather.temp <= celciusThreshold) {
          return 'from-cyan-700 to-blue-700'
        } else {
          return 'from-yellow-700 to-orange-700'
        }
      case 'imperial':
        if (weather.temp <= celciusThreshold || weather.temp <= fahrenheitThreshold) {
          return 'from-cyan-700 to-blue-700'
        } else {
          return 'from-yellow-700 to-orange-700'
        }
    }
  

    // if (weather.temp <= celciusThreshold || weather.temp <= fahrenheitThreshold) {
    //   return 'from-cyan-700 to-blue-700'
    // } else {
    //   return 'from-yellow-700 to-orange-700'
    // }
  }


  return (
    <div className={`mx-auto max-w-screen-md lg:mt-4 lg:mb-4 py-5 md:px-32 sm:px-16 px-2 bg-gradient-to-br ${formatBackground()} h-auto lg:shadow-xl lg:shadow-gray-400 min-h-screen`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} units={units}/>


      {weather && (
        <div>
          <TimeAndLocation
            weather={weather}
          />
          <TemperatureAndDetails
            weather={weather}
          />
          <Forecast
           title={'Hourly Forecast'}
           items = {weather.hourly}
          />
          <Forecast
           title={'Daily Forecast'}
           items = {weather.daily}
          />
        </div>
      )}

      <ToastContainer
      position="top-center"
      theme='colored'
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      />
      
    </div>
  );
}

export default App;
