'use client'

import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

export default function OverviewHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('This Year');
  
  const timeOptions = ['This Year', 'This Month', 'This Week'];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  
  return (
    <div className="w-full flex justify-between items-center py-2">
      <div className="relative">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="absolute h-1 w-full bg-black bottom-0 rounded-full"></div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="flex items-center gap-1 px-3 py-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <span>{selected}</span>
            <ChevronDown size={16} />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {timeOptions.map((option) => (
                <div 
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button className="bg-blue-500 rounded-full p-2 text-white shadow-md">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}