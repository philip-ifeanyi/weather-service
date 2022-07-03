import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Inputs({ setUnits, units, setQuery }) {
  const [ city, setCity ] = useState('');

  const handleSearchClick = (e) => {
    e.preventDefault()

    if (city !== '') {
      setQuery({q: city})
    }
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      toast.info('Fetching location data')
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon,
        });

        toast.success('Location data successfuly fetched')
      });
    }
  }

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit)
    }
  }

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className="flex flex-col sm:flex-row w-3/4 items-center justify-center space-x-4">
        <form onSubmit={handleSearchClick}>
          <input 
            type="search"
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            className='text-xl font-light p-2 focus:outline-none shadow-xl capitalize placeholder:lowercase' 
            placeholder='search city...'
          />
        </form>
        <div className='flex flex-row pt-2'>
          <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearchClick}/>
          <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocation}/>
        </div>
      </div>

      <div className='flex flex-row w-1/4 items-start justify-start sm:justify-center sm:items-center'>
        <button name='metric'className='text-xl font-light text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitChange}>℃</button>
        <p className='mx-1 text-xl text-white'>|</p>
        <button name='imperial' className='text-xl font-light text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitChange}>℉</button>
      </div>
    </div>
  )
}

export default Inputs