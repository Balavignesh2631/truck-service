import React , {useState,useEffect} from 'react';

import MUIDataTable from 'mui-datatables';
import { TextField, InputAdornment } from '@mui/material';

import Sidebar from './Sidebar';

import logo from '../icons/trucklogobg.png';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function MaterialCategory() {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ materials, setMaterials ] =useState([]);

    useEffect ( () => {

        fetchMaterials();
    },[searchQuery]
);

const fetchMaterials = async () => {
    try{
        const response = await fetch(`http://localhost:3000/api/truckdatas?search=${searchQuery}`);
        const data= await response.json();
        setMaterials(data);
    }catch (error){
        console.error('Error fetching materials:', error);
    }

};

const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


const columns = [
    { name: "id", label: "ID", options: { display: 'excluded' } },
    {
      name: "truckNo", label: "Truck Number",
      options: {
        customHeadRender: (columnMeta) => (
          <th className=" text-cyan-500 uppercase text-center font-serif font-antialiased  justify-around
           text-base ">
            {columnMeta.label}</th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 text-center flex justify-around font-semibold">{value}</span>
        )
      }
    },
    {
      name: "driverName", label: "Driver Name",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center font-serif  justify-around
          font-antialiased  text-base '>
            {columnMeta.label}</th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 text-center flex justify-around font-semibold">{value}</span>
        )
      }
    },
    {
      name: "materialName", label: "Material Name",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif
           font-antialiased  text-base '>
            {columnMeta.label}</th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 text-center flex justify-around font-semibold">{value}</span>
        )
      }
    },
    {
      name: "quantity", label: "Material Quantity",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif font-antialiased 
           text-base '>
            {columnMeta.label}</th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 text-center flex justify-around font-semibold ">{value}</span>
        )
      }
    },
    {
      name: "billNo", label: "Bill Number",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif font-antialiased
            text-base '>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900  text-center flex justify-around font-semibold ">{value}</span>
        )
      }


    },
    {
      name: "billDate",
      label: "Bill Date",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif font-antialiased 
           text-base '>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value) => (<span className='text-cyan-900 text-center flex justify-around font-semibold'>{formatDate(value)}</span>)
      }
    },
    {
      name: "materialreturnQuality", label: "Material Return Quantity",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase  text-center justify-around font-serif font-antialiased 
           text-justify text-base '>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 font-semibold text-center flex justify-around ">{value}</span>)
      }
    },
    {
      name: "location", label: "Location",
      options: {
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif font-antialiased
            text-base '>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value) => (
          <span className="text-cyan-900 text-center flex justify-around font-semibold ">{value}</span>)
      }
    },
    
  ];

  const options = {
    responsive: 'standard',
    selectableRows: 'none',
    customToolbar: () => (
      <IconButton color="primary" >
        <AddIcon /><span className='text-blue-500 text-semibold'>ADD</span>
      </IconButton>
    )
  };

  return (
    <>
        <div>
            <header className="flex items-center p-3">
             <img src={logo} alt='loading' className='w-14 h-auto' ></img>
             <h1 className="text-3xl font-bold ml-2 text-shadow-md">Truck Delivery</h1>
            </header>
        </div>

        <div className="flex flex-col md:flex-row h-screen">
            <div className="bg-gray-800 text-white  w-full md:w-1/4 lg:w-44 pt-4  ">
              <Sidebar/>
            </div>
            <div className="flex-1 bg-gradient-to-r from-yellow-100 via-red-200 to-pink-100 p-4 md:p-10">
                 <p className="text-2xl font-semibold mb-10 text-fuchsia-800 text-shadow-md text-center">MaterialCategory Page</p>
                <TextField
                    variant='outlined'
                    placeholder='Search materials Name..'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position='start'>
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
               />
               <MUIDataTable
                    title={
                    <h1 
                        className="text-cyan-700 font-bold upercase font-serif font-antialiased 
                         text-shadow-md text-2xl">
                            Search Result
                    </h1>
                    }
                    data={materials}
                    columns={columns}
                    options={options}
                    className="bg-white shadow-md rounded"
               />

            </div>
        </div>
    </>
  )
}

export default MaterialCategory