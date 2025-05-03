'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { TbDoorExit } from 'react-icons/tb';


import { TbDoorEnter } from 'react-icons/tb';
import { LuAlarmClock } from "react-icons/lu";


export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState('');
  const [inTime, setInTime] = useState('');
  const [inLocation, setInLocation] = useState('');
  const [outTime, setOutTime] = useState('');
  const [outLocation, setOutLocation] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [hasPunchedIn, setHasPunchedIn] = useState(false);
  const [hasPunchedOut, setHasPunchedOut] = useState(false);
  const underlineRef = useRef(null);





  const router = useRouter();

  useEffect(() => {
    if (underlineRef.current) {
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy
    setCurrentDate(dateStr);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  const fetchLocation = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.display_name || 'Unknown Location';
    } catch {
      return 'Failed to fetch location';
    }
  };

  const handlePunchIn = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const location = await fetchLocation(latitude, longitude);
      const time = formatTime(new Date());
      setInTime(time);
      setInLocation(location);
      setHasPunchedIn(true);
      startElapsedTimer();
    });
  };

  const handlePunchOut = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const location = await fetchLocation(latitude, longitude);
      const time = formatTime(new Date());
      setOutTime(time);
      setOutLocation(location);
      setHasPunchedOut(true);
      stopElapsedTimer();
    });
  };

  const startElapsedTimer = () => {
    const startTime = Date.now();
    const id = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(seconds);
    }, 1000);
    setIntervalId(id);
  };

  const stopElapsedTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const formatElapsed = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
     {/* Animated Attendance Heading */}
        <div className="relative ml-10 mt-4 w-max">
          <h2 className="text-2xl  font-bold text-black">Attendance</h2>
          <span
            ref={underlineRef}
            className="absolute left-0 bottom-0 h-[2px] bg-yellow-500 w-full scale-x-0"
          ></span>
        </div>
        
       

    <div className="flex items-center justify-center min-h-screen -mt-20 bg-white p-4">
      <div className="bg-white  rounded-xl w-full max-w-5xl p-6 border-2 border-gray-300 relative">
        <div className="flex justify-between items-center  mx-20 mb-6">
          <button className="bg-[#F4F5FD] px-4 py-2 text-2xl rounded-xl shadow-md font-semibold">{currentDate}</button>
          <div className="w-17 h-17 rounded-full overflow-hidden ">
            <Image src="/profile.png" alt="avatar" width={70} height={70} />
          </div>
          <div className="bg-white text-black text-center border-4 border-[#3794bb] rounded-3xl text-xl font-bold px-12 py-2 ">
            {hasPunchedIn ? formatElapsed(elapsed) : '00:00:00'}
            <div className="text-lg font-normal text-center">Elapsed Time</div>
          </div>
        </div>

        <hr className="h-0.5 bg-gray-400 border-0" />


        <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
  <strong className="w-40">Punch in Time:</strong>
  <div className="bg-[#F4F5FD] p-2 rounded-md shadow-md min-w-[80px]">{inTime||'--:--:--'}</div>
</div>

<div className="flex items-center gap-2">
  <strong className="w-40">Punch in Location:</strong>
  <div className="bg-[#F4F5FD] p-2 rounded-md shadow-md text-sm min-w-[200px]">{inLocation || 'Not punched in yet'}</div>
</div>


<div className="flex justify-around mt-8 mb-8">
  <button
    onClick={handlePunchIn}
    disabled={hasPunchedIn}
    className="flex items-center bg-[#058CBF] text-lg  text-white px-6 py-2 rounded hover:bg-cyan-600 disabled:bg-gray-400"
  >
    <LuAlarmClock className="mr-2" />
    Punch In
    <TbDoorEnter  className="ml-2" />
  </button>
  
  <button
    onClick={handlePunchOut}
    disabled={!hasPunchedIn || hasPunchedOut}
    className="flex items-center bg-[#058CBF] text-lg  text-white px-6 py-2 rounded hover:bg-cyan-600 disabled:bg-gray-400"
  >
    <LuAlarmClock className="mr-2" />
    Punch Out
    <TbDoorExit  className="ml-2" />
  </button>
</div>


<div className="flex items-center gap-2 mb-2">
  <strong className="w-40">Punch Out Time:</strong>
  <div className="bg-[#F4F5FD] p-2 rounded-md shadow-md min-w-[80px]">
    {outTime || '--:--:--'}
  </div>
  <button
    onClick={() => router.push('/punchhistory')}
    className="ml-auto bg-[#058CBF] text-white px-4 py-2 rounded hover:bg-[#69b0c9]"
  >
    Punch History
  </button>
</div>

       
          <div className="flex items-center gap-2">
            <strong className="w-40">Punch Out Location:</strong>
            <div className="bg-[#F4F5FD] p-2 rounded-md shadow-md text-sm min-w-[200px]">{outLocation || 'Not punched out yet'}</div>
          </div>

          
        </div>
      </div>
    </div>
    </>
  );
}
