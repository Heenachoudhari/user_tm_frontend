"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js App Router
import gsap from "gsap";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";

export default function Timeline() {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const router = useRouter();

  const [selectedManagers, setSelectedManagers] = useState([
    "Prashant Patil",
    "Ayaan Raje",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [todayHours, setTodayHours] = useState([]);
  const [totalTime, setTotalTime] = useState("01:00");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const underlineRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      underlineRef.current,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "power2.out" }
    );

    const defaultTimes = Array.from({ length: 8 }, (_, i) => {
      const start = new Date(0, 0, 0, 9 + i, 0);
      const end = new Date(0, 0, 0, 10 + i, 0);
      return {
        timeRange: `${formatTime(start)} - ${formatTime(end)}`,
        task: "",
        type: "default",
        duration: "0100",
        bucket: "work",
      };
    });

    setItems(defaultTimes);
    setTodayHours(defaultTimes.map(() => "0100"));
  }, []);

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
    const lastTime = items[items.length - 1].timeRange.split(" - ")[1];
    const [time, period] = lastTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);
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
      duration: "0100",
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
    setTotalTime("01:00");
  };

  const handleEditTimesheet = () => {
    router.push("/edittimesheet");
  };

  const handleAddTask = () => {
    router.push("/add-task");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl">
      <Toaster />
      <h2 className="text-2xl font-bold mb-1 relative inline-block text-gray-800">
        <span
          ref={underlineRef}
          className="absolute left-0 bottom-0 h-[2px] bg-yellow-500 w-full"
        ></span>
        Add Time
      </h2>
      <span className="text-2xl font-bold text-gray-800">sheet</span>

      <div className="flex justify-end gap-8 mb-4">
        <button
          onClick={handleEditTimesheet}
          className="bg-[#018ABE] hover:bg-[#0177a6] text-white font-semibold px-4 py-2 rounded-md shadow cursor-pointer"
        >
          Edit Timesheet
        </button>
        <button
          onClick={handleAddTask}
          className="bg-[#018ABE] hover:bg-[#0177a6] text-white font-semibold px-4 py-2 rounded-md shadow cursor-pointer"
        >
          Add Task
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
      <div className="flex items-center gap-4 mb-4">
  <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
    Enter Project Name
  </label>
  <input
    type="text"
    placeholder="Project name"
    className="border border-gray-400 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-100 rounded-xl">
          <thead>
            <tr className="bg-[#018ABE]">
              <th className="py-2 px-4 text-white border">Bucket</th>
              <th className="py-2 px-4 text-white border">Task</th>
              <th className="py-2 px-4 text-white border">Time</th>
              <th className="py-2 px-4 text-white border">Duration</th>
              <th className="py-2 px-4 text-white border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} ref={(el) => (rowRefs.current[index] = el)}>
                <td className="px-4 py-2 w-[10%] border-r border-gray-100 text-center">{item.bucket}</td>
                <td className="px-4 py-2 w-[40%] border-r border-gray-100">
                  <input
                    type="text"
                    value={item.task}
                    onChange={(e) => updateItem(index, "task", e.target.value)}
                    className="w-full p-1 shadow-md border border-gray-300  rounded-md"
                    placeholder="Enter task"
                  />
                </td>
                <td className="px-4 py-2 w-[20%] border-r border-gray-100">
                  <input
                    type="text"
                    value={item.timeRange}
                    onChange={(e) => updateItem(index, "timeRange", e.target.value)}
                    className="w-full p-1 shadow-md border border-gray-300  rounded-md"
                    placeholder="Enter time range"
                  />
                </td>
                <td className="px-4 py-2 border-r border-gray-100 w-[10%]">
                  <input
                    type="text"
                    value={formatDuration(item.duration)}
                    onChange={(e) => handleDurationChange(index, e.target.value)}
                    className="w-full p-1 shadow-md rounded-md text-center"
                    placeholder="hh:mm"
                  />
                </td>
                <td className="px-4 py-2 text-center w-[5%]">
                  <button onClick={() => deleteItem(index)} className="text-black">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 mt-3 font-semibold">
              <td className="px-4 py-2 text-center" colSpan={3}>
                Total Hours
              </td>
              <td className="px-4 py-2 text-center border-2 border-white shadow-md">
                {totalTime}
              </td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={handleSubmit}
          className="bg-[#018ABE] text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
