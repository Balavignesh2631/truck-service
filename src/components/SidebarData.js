import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InputIcon from '@mui/icons-material/Input';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeRoundedIcon />,
    link: "/dashboard"
  },
  {
    title: "Gatepass",
    icon: <InputIcon />,
    link: "/getpass"
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/"
  }
];