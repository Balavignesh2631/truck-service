import React from 'react';

import { SidebarData } from "./SidebarData";
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-gray-800 w-full text-white h-full">
      <ul className='space-y-4  ' >
        {SidebarData.map((val, key) => {
          return (
            <li
              className={`flex items-center justify-items-start  p-2  cursor-pointer hover:bg-gray-700 ${location.pathname === val.link ? 'bg-gray-700' : ''}`}
              key={key}
              onClick={() => navigate(val.link)}
            >
              <div className='flex items-start justify-items-start '>
                <div className='mr-4'>
                  {val.icon}
                </div>
                <div className="text-left">
                  {val.title}
                </div>
              </div>
            </li>
          );
        }
        )}

      </ul>

    </div>
  );
}

export default Sidebar;