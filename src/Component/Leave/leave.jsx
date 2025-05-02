'use client'
import React from "react";

export default function Leave() {
  // Define the function inside the component
  const submitLeave = () => {
    alert("Leave Submitted Successfully!");
  };

  return (
    <div className="flex justify-start">
        {/* Leave Form */}
        <section className="p-8">
        <h2 className="text-xl font-bold mb-4 border-b-3 border-[#FC1F1F] inline-block pb-1">MY LEAVE</h2>

        <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-lg p-10 w-[1000px] h-[500px] mt-4">
        <div className="mb-4 flex items-center space-x-10">


  {/* Leave Type */}
  <div className="flex items-center space-x-2">
    <label className="font-bold whitespace-nowrap">Leave Type</label>
    <select className="border border-black-200 rounded px-4 py-2 w-[250px] shadow-lg">
      <option>Select</option>
      <option>Sick Leave</option>
      <option>Casual Leave</option>
    </select>
  </div>

    {/* Select for Approval */}
    <div className="flex items-center space-x-2">
    <label className="font-bold whitespace-nowrap">Select for Approval</label>
    <select className="border border-black-200 rounded px-4 py-2 w-[250px] shadow-lg">
      <option>Select</option>
      <option>Ayaan Raje</option>
      <option>Prashant Patil</option>
      <option>Shams Ali Shaikh</option>
      <option>Awab Fakih</option>
    </select>
  </div>
</div>


        
       <div className="flex space-x-1 mb-4">
  <div className="flex-1 flex items-center space-x-2">
    <label className="font-bold whitespace-nowrap">From Date</label>
    <input
      type="date"
      className="border border-black-200 rounded px-2 py-2 shadow-md"
      defaultValue="0000-00-00"
    />
  </div>
  <div className="flex-1 flex items-center space-x-4    ">
    <label className="font-bold whitespace-nowrap">To Date</label>
    <input
      type="date"
      className="border border-black-200 rounded px-4 py-2 shadow-md"
      defaultValue="0000-00-00"
    />
  </div>
</div>
<div className="mb-6 flex items-start mt-6">
  <label className="font-bold  mt-4 w-40">Reason For Leave</label>
  <textarea
    className="border border-black rounded px-4 py-2 w-[780px] h-[130px] resize-none shadow-lg mt-4"
  ></textarea>
</div>
            <div className="text-center">
              {/* Use onClick={} in React */}
              <button
  onClick={submitLeave}
  className="bg-[#018ABE] font-bold text-white px-6 py-2 rounded hover:bg-[#0177a4] self-start mt-18"
>
  Submit
</button>

            </div>
          </div>
        </section>
    </div>
  );
}
