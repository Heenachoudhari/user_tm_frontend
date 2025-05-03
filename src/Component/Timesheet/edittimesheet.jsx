"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import * as XLSX from "xlsx";

export default function ETimeline() {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const router = useRouter();

  const dummyData = {
    "2025-05-01": [
      { bucket: "work", task: "Bug Fixing", time: "9:00 AM to 10:00 AM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "10:00 AM to 11:00 AM", duration: "01:00" },
      { bucket: "work", task: "Code Review", time: "11:00 AM to 12:00 PM", duration: "01:00" },
      { bucket: "work", task: "Code Review", time: "2:00 PM to 3:00 PM", duration: "01:00" },
      { bucket: "work", task: "Code Review", time: "3:00 PM to 4:00 AM", duration: "01:00" },
      { bucket: "work", task: "Code Review", time: "4:00 PM to 5:00 PM", duration: "01:00" },
      { bucket: "work", task: "Code Review", time: "5:00 PM to 6:00 PM", duration: "01:00" },
    ],
    "2025-05-02": [
        { bucket: "work", task: "Bug Fixing", time: "9:00 AM to 10:00 AM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "10:00 AM to 11:00 AM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "11:00 AM to 12:00 PM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "2:00 PM to 3:00 PM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "3:00 PM to 4:00 AM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "4:00 PM to 5:00 PM", duration: "01:00" },
      { bucket: "work", task: "Bug Fixing", time: "5:00 PM to 6:00 PM", duration: "01:00" },
    ],
    "2025-05-03": [
        { bucket: "work", task: "error ", time: "9:00 AM to 10:00 AM", duration: "01:00" },
        { bucket: "work", task: "Bug Fixing", time: "10:00 AM to 11:00 AM", duration: "01:00" },
        { bucket: "work", task: "Code Review", time: "11:00 AM to 12:00 PM", duration: "01:00" },
        { bucket: "work", task: "error ", time: "2:00 PM to 3:00 PM", duration: "01:00" },
        { bucket: "work", task: "error ", time: "3:00 PM to 4:00 AM", duration: "01:00" },
        { bucket: "work", task: "error ", time: "4:00 PM to 5:00 PM", duration: "01:00" },
        { bucket: "work", task: "error ", time: "5:00 PM to 6:00 PM", duration: "01:00" },
    ],
  };
  

  const [selectedManagers, setSelectedManagers] = useState(["Prashant Patil", "Ayaan Raje"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [todayHours, setTodayHours] = useState([]);
  const [totalTime, setTotalTime] = useState("00:00");

  const underlineRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      underlineRef.current,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (date && dummyData[date]) {
      setItems(dummyData[date]);
      const times = dummyData[date].map((item) =>
        item.duration.replace(":", "")
      );
      setTodayHours(times);
      setTotalTime(addTimeStrings(times));
    } else {
      setItems([]);
      setTodayHours([]);
      setTotalTime("00:00");
    }
  }, [date]);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDuration = (duration) => {
    let numericValue = duration.replace(/\D/g, "").slice(0, 4);
    return `${numericValue.slice(0, 2)}:${numericValue.slice(2, 4)}`;
  };

  const getNextTimeRange = () => {
    if (items.length === 0) return "09:00 AM - 10:00 AM";
    const lastTime = items[items.length - 1].timeRange?.split(" - ")[1] || "10:00 AM";
    const [time, period] = lastTime.split(" ");
    let [hour, minute] = time.split(":" ).map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const start = new Date(0, 0, 0, hour, minute);
    const end = new Date(start.getTime() + 60 * 60000);
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const addTimelineItem = (type) => {
    const newItem = {
      task: `${type} task`,
      timeRange: getNextTimeRange(),
      duration: "01:00",
      type,
      bucket: type,
    };
    setItems((prev) => [...prev, newItem]);
    setTodayHours((prev) => [...prev, "0100"]);

    setTimeout(() => {
      const newIndex = items.length;
      const lastRow = rowRefs.current[newIndex];
      if (lastRow) {
        gsap.fromTo(
          lastRow,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }, 0);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleDurationChange = (index, value) => {
    let formattedDuration = formatDuration(value);
    const updated = [...todayHours];
    updated[index] = value.replace(/\D/g, "").slice(0, 4);
    setTodayHours(updated);
    const validTimes = updated.filter((val) => val.length === 4);
    setTotalTime(addTimeStrings(validTimes));
    updateItem(index, "duration", formattedDuration);
  };

  const addTimeStrings = (times) => {
    let totalMinutes = 0;
    for (const time of times) {
      const h = parseInt(time.slice(0, 2), 10);
      const m = parseInt(time.slice(2, 4), 10);
      if (!isNaN(h) && !isNaN(m) && h < 24 && m < 60) {
        totalMinutes += h * 60 + m;
      }
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    const updatedTimes = [...todayHours];
    updatedItems.splice(index, 1);
    updatedTimes.splice(index, 1);
    setItems(updatedItems);
    setTodayHours(updatedTimes);
    setTotalTime(addTimeStrings(updatedTimes.filter((val) => val.length === 4)));
  };

  const handleSubmit = () => {
    console.log({ date, selectedManagers, items, totalTime });
    toast.success("Timeline submitted successfully!");
    setDate("");
    setSelectedManagers([]);
    setItems([]);
    setTodayHours([]);
    setTotalTime("00:00");
  };

  const exportToExcel = () => {
    const worksheetData = items.map((item) => ({
      Bucket: item.bucket,
      Task: item.task,
      Time: item.time || item.timeRange,
      Duration: item.duration,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
    XLSX.writeFile(workbook, "Timesheet.xlsx");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl">
      <Toaster />
      <h2 className="text-2xl font-bold mb-1 relative inline-block text-gray-800">
        <span
          ref={underlineRef}
          className="absolute left-0 bottom-0 h-[2px] bg-yellow-500 w-full"
        ></span>
        Edit Time
      </h2>
      <span className="text-2xl font-bold text-gray-800">sheet</span>

      <div className="flex justify-end mt-4">
        <button
          onClick={exportToExcel}
          className="bg-[#018ABE] text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Export
        </button>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
        <div className="flex flex-col w-[200px]">
          <label className="mb-1 font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md p-1.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
          />
        </div>

        <div className="flex flex-col mr-50 w-[260px] relative">
          <label className="mb-1 font-medium text-gray-700">Select Manager</label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm flex items-center justify-between"
          >
            <span className="text-sm text-gray-800">{`All Selected (${selectedManagers.length})`}</span>
            <FiChevronDown className="text-gray-600 text-lg" />
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 bg-white border border-gray-200 shadow-md rounded-md w-full z-10">
              {["Awab Fakih", "Ayaan Raje", "Prashant Patil"].map((managerName) => (
                <label
                  key={managerName}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    className="w-5 h-5 text-blue-600"
                    type="checkbox"
                    checked={selectedManagers.includes(managerName)}
                    onChange={() =>
                      setSelectedManagers((prev) =>
                        prev.includes(managerName)
                          ? prev.filter((m) => m !== managerName)
                          : [...prev, managerName]
                      )
                    }
                  />
                  {managerName}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addTimelineItem("meeting")}
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Add Meeting
          </button>
          <button
            onClick={() => addTimelineItem("miscellaneous")}
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Add Miscellaneous
          </button>
        </div>
      </div>

      {/* Timeline Display */}
      <div className="space-y-4">
  <table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr className="bg-[#018ABE] text-white">
        <th className="px-4 py-2 border border-gray-300 text-left">Bucket</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Task</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Time</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Duration</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
  {items.map((item, index) => (
    <tr key={index} className="bg-white hover:bg-gray-100">
      <td className="px-4 py-2 border border-gray-300 w-[10%]">{item.bucket}</td>
      <td className="px-4 py-2 border border-gray-300 w-[40%]">{item.task}</td>
      <td className="px-4 py-2 border border-gray-300 w-[20%]">{item.time || item.timeRange}</td>
      <td className="px-4 py-2 border border-gray-300 w-[10%]">
        <input
          type="text"
          value={item.duration}
          onChange={(e) => handleDurationChange(index, e.target.value)}
          className="border px-2 py-1 rounded-md"
        />
      </td>
      <td className="px-4 py-2 border w-[5%] border-gray-300">
        <button
          onClick={() => deleteItem(index)}
          className="text-red-600 hover:text-red-800 "
        >
          <AiFillDelete size={20} />
        </button>
      </td>
    </tr>
  ))}
  {/* Total Hours Row */}
  <tr className="bg-gray-100 mt-3 font-semibold">
              <td className="px-4 py-2 text-center" colSpan={3}>
                Total Hours
              </td>
              <td className="px-4 py-2 text-center ">
                {totalTime}
              </td>
              <td className="px-4 py-2"></td>
            </tr>
</tbody>

  </table>
</div>

      <div className="mt-6 flex justify-center items-center">
     
        <button
          onClick={handleSubmit}
          className="bg-[#018ABE] text-white  px-6 py-2 rounded-lg hover:bg-green-700"
        >
         update
        </button>
      </div>
    </div>
  );
}
