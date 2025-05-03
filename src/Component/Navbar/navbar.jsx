'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
 
  FaBell,
  FaVideo,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useUser } from '../usersignup/usercontext';

export default function NavBar() {
  const { userName } = useUser();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifications = []; // Replace with actual notifications if needed

  

  const handleProfileAction = (action) => {
    alert(`Profile action: ${action}`);
    setShowProfileMenu(false);
  };

  return (
    <div className="bg-cyan-300 px-6 py-3 shadow flex items-center min-w-full relative">
      {/* Centered Welcome Message */}
      <h1 className="text-3xl font-bold text-black absolute left-10 transform whitespace-nowrap">
        Welcome {userName || 'Ayaan Raje'}!
      </h1>

      <div className="ml-auto flex items-center gap-12 mr-10">
        {/* Video Icon */}
        <button title="Video Call">
          <FaVideo className="w-5 h-5 text-black" />
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative cursor-pointer"
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

        {/* User Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-gray-300 transition-all relative">
              <Image
                src="/profile.png"
                alt="User"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/profile.png" // Replace with your profile image URL
                      alt="User"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{userName || 'Guest'}</div>
                    <div className="text-sm text-gray-500">user@example.com</div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={() => handleProfileAction('view-profile')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100"
                >
                  <FaUser className="text-gray-600" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => handleProfileAction('change-photo')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100"
                >
                  <FaCog className="text-gray-600" />
                  <span>Change Profile Photo</span>
                </button>

                <button
                  onClick={() => handleProfileAction('settings')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100"
                >
                  <FaCog className="text-gray-600" />
                  <span>Settings</span>
                </button>

                <div className="border-t my-1"></div>

                <button
                  onClick={() => handleProfileAction('logout')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100 text-red-500"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
