'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function Attendance() {
    const [inTime, setInTime] = useState('');
    const [inLocation, setInLocation] = useState('');
    const [punchOuts, setPunchOuts] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [error, setError] = useState('');
    const [hasPunchedIn, setHasPunchedIn] = useState(false);

    const formatDate = (date) => date.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        const today = new Date();
        const dateStr = formatDate(today);
        setCurrentDate(dateStr);

        const saved = JSON.parse(localStorage.getItem('attendance') || '{}');

        if (saved.date === dateStr) {
            setHasPunchedIn(!!saved.inTime);
            setInTime(saved.inTime || '');
            setInLocation(saved.inLocation || '');
            setPunchOuts(saved.punchOuts || []);
        } else {
            localStorage.removeItem('attendance');
            setHasPunchedIn(false);
            setPunchOuts([]);
        }
    }, []);

    const fetchLocation = async (lat, lon) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            return data.display_name || 'Unknown Location';
        } catch {
            return 'Failed to fetch location';
        }
    };

    const handlePunchIn = () => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const location = await fetchLocation(latitude, longitude);
                const time = formatTime(new Date());

                setInTime(time);
                setInLocation(location);
                setHasPunchedIn(true);

                localStorage.setItem('attendance', JSON.stringify({
                    date: currentDate,
                    inTime: time,
                    inLocation: location,
                    punchOuts: []
                }));

                toast.success('Punched In Successfully!'); // Display success toast
            },
            () => setError('Failed to get location.')
        );
    };

    const handlePunchOut = () => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const location = await fetchLocation(latitude, longitude);
                const time = formatTime(new Date());

                const newEntry = { time, location };
                const updatedPunchOuts = [...punchOuts, newEntry];
                setPunchOuts(updatedPunchOuts);

                const existing = JSON.parse(localStorage.getItem('attendance') || '{}');
                localStorage.setItem('attendance', JSON.stringify({
                    ...existing,
                    punchOuts: updatedPunchOuts
                }));

                toast.success('Punched Out Successfully!'); // Display success toast
            },
            () => setError('Failed to get location.')
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/signup/bgright.png')" }}>
            <div className="bg-cyan-50 p-6 rounded-2xl shadow-xl w-full max-w-md text-gray-800">
                <h2 className="text-center text-xl font-semibold text-gray-900 mb-4">
                    {currentDate || 'Loading...'}
                </h2>

                <div className="border-t border-b py-3 flex justify-between items-center">
                    <span className="font-medium">Status</span>
                    <span className="flex items-center gap-2 text-green-600 font-bold">
                        {hasPunchedIn ? 'Present' : 'Not Marked'}
                        <span className={`w-4 h-4 rounded-sm ${hasPunchedIn ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                    </span>
                </div>

                <div className="mt-4">
                    <div className="mb-2">
                        <span className="font-semibold">In Time:</span>
                        <span className="ml-2 text-gray-700">{inTime}</span>
                    </div>

                    <div className="mb-4">
                        <span className="font-semibold">In Location:</span>
                        <p className="text-sm text-gray-700 ml-2 mt-1">{inLocation}</p>
                    </div>

                    <button
                        onClick={handlePunchIn}
                        disabled={hasPunchedIn}
                        className={`w-full ${hasPunchedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-cyan-300 hover:bg-cyan-400'} text-black font-bold py-2 rounded-xl mb-4`}
                    >
                        {hasPunchedIn ? 'Punched In' : 'Punch In'}
                    </button>

                    <div className="mb-2">
                        <span className="font-semibold">Last Punch Out:</span>
                        {punchOuts.length > 0 ? (
                            <div className="ml-4 mt-2 text-sm text-gray-700">
                                <strong>{punchOuts[punchOuts.length - 1].time}</strong>
                                <p className="text-xs">{punchOuts[punchOuts.length - 1].location}</p>
                            </div>
                        ) : (
                            <span className="ml-2 text-gray-500">No punch outs yet</span>
                        )}
                    </div>

                    <button
                        onClick={handlePunchOut}
                        disabled={!hasPunchedIn}
                        className={`w-full ${!hasPunchedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-cyan-300 hover:bg-cyan-400'} text-black font-bold py-2 rounded-xl mt-4`}
                    >
                        Punch Out
                    </button>

                    {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
                </div>
            </div>
        </div>
    );
}
