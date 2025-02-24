import React, { useEffect, useState } from 'react'




import Sidebar from './Sidebar'
import DataTable from './DataTable';

import logo from '../icons/trucklogobg.png'


function Getpass() {
  const [truckData, setTruckData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/truckdatas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTruckData(data);
      } catch (error) {
        console.error('Error fetching truck data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS TRUCKDATA')) {
      try {
        const response = await fetch(`http://localhost:3000/api/truckdatas/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error('errror response:', response.status, errorText);
          throw new Error('network response was not ok');
        }
        const result = await response.json();

        alert(result.message);
        setTruckData((prevData) => prevData.filter((data) => data.id !== id));
      } catch (error) {
        console.error('Error deleting truckdata:', error);
        alert('An error occurred while deleting the truck data' + error.message);
      }
    }
  };

  return (
    <>


      <div className="bg-gray-200  border-b border-gray-300">
        <header className="flex items-center p-3">
          <img src={logo} alt='loading' className='w-14 h-auto' ></img>
          <h1 className="text-3xl font-bold ml-2 text-shadow-md">Truck Delivery</h1>
        </header>
      </div>

      <div className="flex flex-col md:flex-row h-screen">
        <div className="bg-gray-800 text-white  w-full md:w-1/4 lg:w-44 pt-4 ">
          <Sidebar />
        </div>

        <div className='flex-1 bg-gradient-to-r from-yellow-100 via-red-200 to-pink-100 p-4 md:p-10'>
          <p className='text-2xl font-semibold text-fuchsia-800 text-shadow-md mb-10 text-shadow-md text-center'>GatePass page</p>
          <section>
            <DataTable data={truckData} handleDelete={handleDelete} setTruckData={setTruckData} />
          </section>

        </div>
      </div>

    </>
  );
}

export default Getpass
