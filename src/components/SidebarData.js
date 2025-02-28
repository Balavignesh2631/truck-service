import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InputIcon from '@mui/icons-material/Input';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

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
    title: "MaterialCategory",
    icon: <ManageSearchIcon/>,
    link: "/materialcategory"
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/"
  }
];