'use client';
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

export default function LeaveTable() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [leaveType, setLeaveType] = useState('');
  const [approvalTo, setApprovalTo] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    setLeaves(storedLeaves);
  }, []);

  const refreshLeaves = () => {
    const updatedLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    setLeaves(updatedLeaves);
  };

  const submitLeave = () => {
    if (
      !leaveType || leaveType === 'Select' ||
      !approvalTo || approvalTo === 'Select' ||
      !fromDate || !toDate || !reason.trim()
    ) {
      toast.error('Please fill out all fields before submitting.', { duration: 3000 });
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      toast.error('To Date cannot be before From Date.', { duration: 3000 });
      return;
    }

    const newLeave = {
      leaveType,
      approvalTo,
      fromDate,
      toDate,
      reason,
      applyDate: today,
      totalDays: calculateDays(fromDate, toDate),
      status: 'Pending',
    };

    const existingLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    existingLeaves.push(newLeave);
    localStorage.setItem('leaves', JSON.stringify(existingLeaves));

    toast.success('Leave Submitted Successfully!', { duration: 3000 });
    setShowModal(false);

    // Reset form
    setLeaveType('');
    setApprovalTo('');
    setFromDate('');
    setToDate('');
    setReason('');

    refreshLeaves();
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    return diff || 0;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <Toaster />
      <h1 className="text-2xl font-bold mb-2">My Leave</h1>
      <div className="w-24 h-1 bg-red-500 mb-6"></div>

      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-5 py-2 bg-[#018ABE] text-white rounded-full hover:bg-[#017ba9] transition"
      >
        Leave Application
      </button>

      {/* LEAVE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-[3px] flex justify-center items-center z-50">

          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-lg p-10 w-[1000px] h-[600px] relative">
          <div className="flex justify-center">
  <h2 className="text-xl font-bold mb-8 border-b-2 border-black inline-block pb-1">
    Leave Application
  </h2>
</div>

<div className="flex space-x-10 mb-4 gap-45">
<div className="flex items-center space-x-2">
  <label className="font-bold whitespace-nowrap">From Date</label>
  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    min={today}
    className="rounded px-2 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-300"
  />
</div>

<div className="flex items-center space-x-24">
  <label className="font-bold whitespace-nowrap">To Date</label>
  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    min={fromDate || today}
    className="rounded px-2 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-300"
  />
</div>

            </div>

            <div className="mb-4 flex items-center space-x-10 gap-20">
              <div className="flex items-center space-x-2">
                <label className="font-bold whitespace-nowrap">Leave Type</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}
                  className="rounded px-4 py-2 w-[250px] shadow-lg outline-none focus:ring-2 focus:ring-blue-300">

                  <option>Select</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="font-bold whitespace-nowrap">Select for Approval</label>
                <select value={approvalTo} onChange={(e) => setApprovalTo(e.target.value)}
                  className="rounded px-4 py-2 w-[250px] shadow-lg outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Select</option>
                  <option>Ayaan Raje</option>
                  <option>Prashant Patil</option>
                  <option>Shams Ali Shaikh</option>
                  <option>Awab Fakih</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
  <label className="font-semibold text-lg">Attachment</label>

  <div className="flex items-center space-x-2">
    {/* File Input Box */}
    <div className="flex items-center border rounded-md bg-[#877575] px-2 py-2 w-[300px] shadow-md">
      <input
        type="file"
        className="text-black file:mr-4 file:py-1 file:px-3
                   file:rounded file:border file:border-gray-300
                   file:text-sm file:font-medium
                   file:bg-white file:text-black
                   hover:file:bg-gray-200"
      />
    </div>

    {/* Delete Icon Outside the Box */}
    <button type="button" className="text-black hover:text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H7.5a1 1 0 01-1-.5L5 9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2z" />
      </svg>
    </button>
  </div>
</div>


            <div className="mb-6 flex items-start mt-6">
              <label className="font-bold mt-4 w-40">Reason For Leave</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)}
                className="border border-black rounded px-4 py-2 w-[780px] h-[130px] resize-none shadow-lg mt-4"></textarea>
            </div>

            <div className="text-center space-x-4">

            <button
  onClick={() => setShowModal(false)}
  className="border border-blue-500 text-blue-500 bg-white px-6 py-2 rounded shadow-md hover:bg-blue-50 font-bold self-start mt-3 rounded-lg"
>
  Cancel
</button>


  <button
    onClick={submitLeave}
    className="bg-[#018ABE] font-bold text-white px-6 py-2 rounded hover:bg-#018ABE self-start mt-3 rounded-lg"
  >
    Submit
  </button>
</div>

            
          </div>
        </div>
      )}

      {/* LEAVE TABLE */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full border-separate border-spacing-0">
          <thead style={{ backgroundColor: '#018ABE' }} className="text-white">
            <tr className="text-left">
              <th className="p-3 border-r border-white rounded-tl-lg">Sr No.</th>
              <th className="p-3 border-r border-white">Request to</th>
              <th className="p-3 border-r border-white">Reason for Leave</th>
              <th className="p-3 border-r border-white">Apply Date</th>
              <th className="p-3 border-r border-white">From Date</th>
              <th className="p-3 border-r border-white">To Date</th>
              <th className="p-3 border-r border-white">Days</th>
              <th className="p-3 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leaves.map((leave, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 border-r">{index + 1}</td>
                <td className="p-3 border-r">{leave.approvalTo}</td>
                <td className="p-3 border-r">{leave.reason}</td>
                <td className="p-3 border-r">{leave.applyDate}</td>
                <td className="p-3 border-r">{leave.fromDate}</td>
                <td className="p-3 border-r">{leave.toDate}</td>
                <td className="p-3 border-r">{leave.totalDays}</td>
                <td className="p-3 font-bold text-gray-700">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
