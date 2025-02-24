import React from 'react';


import Sidebar from './Sidebar';
import ImageSlider from './ImageSlider';

import logo from '../icons/trucklogobg.png';
import image1 from '../icons/db1.jpg';
import image2 from '../icons/image-1.jpg';
import image3 from '../icons/db3.jpg';
import image4 from '../icons/image-3.jpg';
import image5 from '../icons/db5.png';



function Dashboard() {
  const images = [image1, image2, image3, image4, image5];




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
        <div className="flex-1 bg-gradient-to-r from-yellow-100 via-red-200 to-pink-100 p-4 md:p-10">
          <p className="text-2xl font-semibold mb-10 text-fuchsia-800 text-shadow-md text-center">Dashboard Page</p>
          <ImageSlider images={images} interval={5000} />
        </div>
      </div>
    </>

  );
}

export default Dashboard;