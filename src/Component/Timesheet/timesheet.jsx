"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function Timeline() {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const [manager, setManager] = useState("All Selected (2)");
  const [todayHours, setTodayHours] = useState([]);
  const [totalTime, setTotalTime] = useState("01:00");
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([
    "Prashant Patil",
    "Ayaan Raje",
  ]);
  const underlineRef = useRef(null);
  const rowRefs = useRef([]);

  const managersList = ["Awab Fakih", "Ayaan Raje", "Prashant Patil"];

  useEffect(() => {
    gsap.fromTo(
      underlineRef.current,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "power2.out" }
    );

    // Default time slots 9am to 5pm with default 1 hour duration
    const defaultTimes = Array.from({ length: 8 }, (_, i) => {
      const hour = 9 + i;
      const timeString = `${String(hour).padStart(2, "0")}:00`;
      return { timeRange: timeString, task: "", type: "default", duration: "01:00", bucket: "meeting" };
    });

    setItems(defaultTimes);
    setTodayHours(defaultTimes.map(() => "01:00")); // Default duration
  }, []);

  const addTimelineItem = (type) => {
    const newItem = {
      task: "",
      timeRange: "",
      duration: "01:00", // Default duration
      type,
      bucket: "meeting",  // Default bucket value
    };
    setItems((prev) => [...prev, newItem]);
    setTodayHours((prev) => [...prev, "01:00"]);

    setTimeout(() => {
      const lastRow = rowRefs.current[items.length];
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
    let numericValue = value.replace(/\D/g, "").slice(0, 4);
    const updated = [...todayHours];
    updated[index] = numericValue;
    setTodayHours(updated);

    const validTimes = updated.filter((val) => val.length === 4);
    setTotalTime(addTimeStrings(validTimes));
    updateItem(index, "duration", numericValue);
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
    console.log({ date, manager, items, totalTime });
    toast.success("Timeline submitted successfully!");
    setDate("");
    setManager("All Selected (2)");
    setItems([]);
    setTodayHours([]);
    setTotalTime("01:00");
  };

  const toggleManagerSelection = (managerName) => {
    setSelectedManagers((prev) =>
      prev.includes(managerName)
        ? prev.filter((m) => m !== managerName)
        : [...prev, managerName]
    );
  };

  const displayText = () => {
    if (selectedManagers.length === 0) return "Select Manager";
    if (selectedManagers.length === managersList.length)
      return `All Selected (${selectedManagers.length})`;
    return `Selected (${selectedManagers.length})`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 relative inline-block text-gray-800">
        <span
          ref={underlineRef}
          className="absolute left-0 bottom-0 h-[2px] bg-yellow-500 w-full"
        ></span>
        Add Time
      </h2>
      <span className="text-2xl font-bold text-gray-800">sheet</span>

      {/* Date & Manager */}
      <div className="flex flex-wrap gap-8 mb-6 items-end">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md p-1.5 w-48 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
          />
        </div>

        <div className="flex flex-col relative w-64">
          <label className="mb-1 font-medium text-gray-700">Select Manager</label>
          <div className="relative">
            <div
              className="border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm cursor-pointer flex justify-between items-center"
              onClick={() => setIsManagerOpen(!isManagerOpen)}
            >
              {displayText()}
              <span className="ml-2">&#9662;</span>
            </div>

            {isManagerOpen && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg">
                {managersList.map((managerName) => (
                  <label
                    key={managerName}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedManagers.includes(managerName)}
                      onChange={() => toggleManagerSelection(managerName)}
                      className="form-checkbox h-4 w-4 accent-black"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {managerName}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addTimelineItem("meeting")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Meeting
          </button>
          <button
            onClick={() => addTimelineItem("misc")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add Miscellaneous
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Bucket</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Duration (hhmm)</th>
              <th className="py-2 px-4 border">Task</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} ref={(el) => (rowRefs.current[index] = el)}>
                <td className="border px-4 py-2 text-center">
work
                </td>
                <td className="border px-4 py-2">
                  {item.timeRange}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => handleDurationChange(index, e.target.value)}
                    className="w-full p-1 border rounded-md"
                    placeholder="Enter duration"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.task}
                    onChange={(e) => updateItem(index, "task", e.target.value)}
                    className="w-full p-1 border rounded-md"
                    placeholder="Enter task"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => deleteItem(index)}
                    className="text-red-500"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Time */}
      <div className="flex justify-end mb-6">
        <div className="font-semibold text-xl">Total Time: {totalTime}</div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
