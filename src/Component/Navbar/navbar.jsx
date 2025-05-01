  'use client';

import { useState } from 'react';
import { FaSearch, FaBell, FaVideo } from 'react-icons/fa';
import { useUser } from '../usersignup/usercontext';

export default function NavBar() {
  const { userName } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = []; // Replace with actual notifications if needed

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="bg-cyan-300 px-6 py-3 shadow flex items-center relative">
      
      {/* Centered Welcome Message */}
      <h1 className="text-3xl font-bold text-black absolute left-10 transform  whitespace-nowrap">
        Welcome {userName || 'Guest'}!
      </h1>

      {/* Right-Aligned Search and Icons */}
      <div className="ml-auto flex items-center gap-12 mr-10">
      

        {/* Video Icon */}
        <button title="Video Call">
          <FaVideo className="w-5 h-5 text-black" />
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <FaBell className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
              <div className="p-4 font-semibold border-b">Notifications</div>
              <div className="p-4 text-gray-500 text-sm">
                {notifications.length === 0
                  ? 'No new notifications'
                  : notifications.map((note, idx) => (
                      <div key={idx} className="mb-2">
                        {note}
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <img
          src="https://i.pravatar.cc/40?img=11"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </div>
  );
}
