import React, { useState } from 'react';
import logo from '../icons/trucklogobg.png';
import logo1 from '../icons/login1.png';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock, Login } from '@mui/icons-material';

function LoginPage() {
  const DEFAULT_USERNAME = 'truckdelivery';
  const DEFAULT_PASSWORD = 'truck@26';

  const [username, setusername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      alert('Login Successful!');
      window.location.href = '/dashboard';
    } else {
      setError('Invalid Credentials');
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (

    <>
      <div className="bg-gray-200  border-b border-gray-300">
        <header className="flex items-center p-3">
          <img src={logo} alt='loading' className='w-14 h-auto' ></img>
          <h1 className="text-3xl font-bold ml-2 text-shadow-md">Truck Delivery</h1>
        </header>
      </div>
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 via-red-200 to-pink-100'>
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <img src={logo1} alt="login" className="w-full h-auto"></img>
            <div>
              <h2 className='text-xl font-bold text-fuchsia-800  text-shadow-md'>Login Form</h2>
              {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <TextField
                  label="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  className=" p-2"
                />
                <TextField
                  label="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}

                        </IconButton>
                      </InputAdornment>
                    ),

                  }}
                  // variant='outlined'
                  className=' p-2'
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Login />}
                  className='bg-green-500 text-white p-3 rounded hover:bg-green-800'
                >
                  Login
                </Button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage