import NavBar from '@/Component/navbar/navbar'
import Timeline from '@/Component/timesheet/timesheet'
import Sidebar from '@/Component/usersidebar/usersidebar'
import React from 'react'

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed */}
      <div className="w-1/5 fixed top-0 bottom-0 left-0 bg-gray-100 z-10">
        <Sidebar />
      </div>

      {/* Main Content Area - with margin to avoid overlapping */}
      <div className="ml-[20%] flex flex-col w-[80%] h-screen overflow-hidden">
        {/* Navbar - Fixed */}
        <div className="fixed top-0 right-0 w-[80%] z-0">
          <NavBar />
        </div>

        {/* Scrollable Content below Navbar */}
        <div className="mt-[60px] p-4 overflow-y-auto flex-1 bg-white">
          <Timeline />
        </div>
      </div>
    </div>
  );
}
