import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { IconButton, Modal, Box, TextField, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import trucklogo from '../icons/trucklogobg.png';



const DataTable = ({ data, handleDelete, setTruckData }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    truckNo: '',
    driverName: '',
    materialName: '',
    quantity: '',
    billNo: '',
    billDate: '',
    materialreturnQuality: '',
    location: ''
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOpen = async (id = null) => {
    if (id) {
      setEditId(id);
      setEditMode(true);
      try {
        const response = await fetch(`http://localhost:3000/api/truckdatas/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('error response:', response.status, errorText);
          throw new Error('network response was not ok');
        }
        const result = await response.json();
        setFormData({
          truckNo: result.truckNo,
          driverName: result.driverName,
          materialName: result.materialName,
          quantity: result.quantity,
          billNo: result.billNo,
          billDate: new Date(result.billDate).toISOString().split('T')[0],
          materialreturnQuality: result.materialreturnQuality,
          location: result.location
        });
      } catch (error) {
        alert('Error fetching data:' + error.message);
      }
    } else {
      setEditMode(false);
      setFormData({
        truckNo: '',
        driverName: '',
        materialName: '',
        quantity: '',
        billNo: '',
        billDate: '',
        materialreturnQuality: '',
        location: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setEditMode(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const formattedBillDate = new Date(formData.billDate).toISOString().split('T')[0];

      const response = await fetch(`http://localhost:3000/api/truckdatas${editMode ? `/${editId}` : ''}`, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,

          billDate: formattedBillDate,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      alert(result.message);
      handleClose();
      setFormData({
        truckNo: '',
        driverName: '',
        materialName: '',
        quantity: '',
        billNo: '',
        billDate: '',
        materialreturnQuality: '',
        location: ''
      });
      // Fetch the updated data
      const updatedResponse = await fetch('http://localhost:3000/api/truckdatas');
      const updatedData = await updatedResponse.json();
      setTruckData(updatedData);
    } catch (error) {
      alert('Error submitting data:' + error.message);
    }
  };

  const handlePrint = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/truckdatas/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('error response:', response.status, errorText);
        throw new Error('network response was not ok');
      }
      const result = await response.json();
      const printContent = document.createElement('div');


      printContent.innerHTML = `
        <div class="p-12  mx-2  bg-white w-7/12 h-full">
          <div class=" flex justify-between items-center mb-2">
            <img src="${trucklogo}" alt="company logo" class=" w-24 h-24"/>
            <h2 class="text-2xl font-bold text-shadow-default text-indigo-600 text-right uppercase  "> Truck Delivery</h2> 
                      
          </div>
          <h3 class=" text-xl text-right font-semibold mb-6 ">GatePass Details</h3>
          <div class="border bg-gray-100 p-2 mb-4 rounded-lg">
            <div class="flex justify-between">
               <p class="text-lg font-semibold">Truck Number:</p>
               <p class="text-lg font-semibold"> ${result.truckNo}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-lg font-semibold"> Drive Name:</p>
              <p class="text-lg font-semibold"> ${result.driverName}</p>
            </div>
            
          </div>
          <div class="border bg-indigo-300 p-2 mb-4 rounded-lg">
            <div class="flex justify-between">
              <p class="text-lg font-semibold">Material Name:</p>
              <p class="text-lg font-semibold"> ${result.materialName}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-lg font-semibold">Material Quantity:</p>
              <p class="text-lg font-semibold"> ${result.quantity}</p>
            </div>
          </div>
          <table class="w-full border-collapse border border-black rounded-md table-fixed">
            <thead class="  bg-blue-600  ">
              <tr>
                <th class="text-black-500 p-2 border border-black font-semibold text-center">Bill Number</th>
                <th class="text-black-500 p-2  border border-black font-semibold text-center">Bill Date</th>
                <th class="text-black-500 p-2 border border-black font-semibold text-center">Material Return Quantity</th>
                <th class="text-black-500  p-2 border border-black font-semibold text-center">Location</th>
              </tr>
            </thead>
            <tbody class=" bg-gray-100"> 
                <tr class="mb-2">
                <td class="text-black-500 p-2 border border-black text-center">${result.billNo}</td>
                <td class="text-black-500  border border-black text-center">${formatDate(result.billDate)}</td>
                <td class=" text-black-500 p-2 border border-black text-center">${result.materialreturnQuality}</td>
                <td class="text-black-500 p-2 border border-black text-center">${result.location}</td>
              </tr>
            </tbody>
          </table>
          <div class=" flex justify-between mt-5">
            <p class="text-lg font-semibold">Authorized Signature</p>
            <input type="text" class="border border-black w-21 p-2"/>
           
          </div>
          
        </div>
      `;
      document.body.appendChild(printContent);
      const canvas = await html2canvas(printContent);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      const fileName = `${result.truckNo}_${formatDate(result.billDate).replace(/\//g, '-')}.pdf`;
      pdf.save(fileName);
      document.body.removeChild(printContent);
    } catch (error) {
      alert('Error fetching data:' + error.message);
    }
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
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <th className='text-cyan-500 uppercase text-center justify-around font-serif font-antialiased 
           text-base '>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[0];
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <IconButton color="primary" onClick={() => handleOpen(id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="default" onClick={() => handlePrint(id)}>
                <PrintIcon />
              </IconButton>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPage: 3,
    rowsPerPageOptions: [3, 10, 15, 20],
    download: false,
    print: false,
    viewColumns:false,
    search: true,
    customToolbar: () => (
      <IconButton color="primary" onClick={() => handleOpen(null)}>
        <AddIcon /><span className='text-blue-500 text-semibold'>ADD</span>
      </IconButton>
    )
  };

  return (
    <>
      <div className="overflow-x-auto md:overflow-x-hidden">
        <MUIDataTable
          title={
            <h1 className="text-cyan-700 font-bold uppercase font-serif font-antialiased 
          text-shadow-md text-2xl">
              Truck Delivery Data
            </h1>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box"
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '80%', 
            maxWidth: '800px', 
            maxHeight: '90vh', // Ensure the modal box does not exceed 90% of the viewport height
            overflowY: 'auto', // Add vertical scrollbar if content overflows
            bgcolor: 'background.paper', 
            border: '2px solid #000', 
            boxShadow: 24, 
            p: 4 
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <h2>{editMode ? 'Edit Truck Data' : 'Add New Truck Data'}</h2>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-4">
              <TextField
                label="Truck Number"
                name="truckNo"
                value={formData.truckNo}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Driver Name"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Material Name"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Material Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Bill Number"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Bill Date"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Material Return Quantity"
                name="materialreturnQuality"
                value={formData.materialreturnQuality}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  className: "text-indigo-600 font-serif font-semibold font-base"
                }}
                InputProps={{
                  className: "text-blue-700 font-mono font-base font-antialiased font-medium"
                }}
              />
            </div>
            <Grid item xs={12} className="mt-4">
              <Button type="submit" variant="contained" color="primary"
                className='outline outline-offset-2 outline-pink-500 outline-2 
              hover:ring-offset-2 ring-2 ring-offset-slate-50 
              dark:ring-offset-slate-900'>
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DataTable;