"use client";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router

export default function LeaveTable() {
  const router = useRouter();

  const goToLeaveApplication = () => {
    router.push("/Leave");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">My Leave</h1>
      <div className="w-24 h-1 bg-red-500 mb-6"></div>

     <button
  onClick={goToLeaveApplication}
  className="mb-6 px-5 py-2 bg-[#018ABE] text-white rounded-full hover:bg-[#017ba9] transition"
>
  Leave Application
</button>
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
        <th className="p-3 border-r border-white">Total Days</th>
        <th className="p-3 rounded-tr-lg">Status</th>
      </tr>
    </thead>
    <tbody className="bg-white">
      <tr className="border-t">
        <td className="p-3 border-r">1.</td>
        <td className="p-3 border-r">Ayaan Raje</td>
        <td className="p-3 border-r">Cousin Marriage</td>
        <td className="p-3 border-r">30-04-2025</td>
        <td className="p-3 border-r">10-05-2025</td>
        <td className="p-3 border-r">01-04-2025</td>
        <td className="p-3 border-r font-semibold">05</td>
        <td className="p-3 text-green-600 font-bold">Approved</td>
      </tr>
      <tr className="border-t">
        <td className="p-3 border-r">2.</td>
        <td className="p-3 border-r">Ayaan Raje</td>
        <td className="p-3 border-r">Sick</td>
        <td className="p-3 border-r">28-03-2025</td>
        <td className="p-3 border-r">29-03-2025</td>
        <td className="p-3 border-r">01-04-2025</td>
        <td className="p-3 border-r font-semibold">03</td>
        <td className="p-3 text-red-600 font-semibold">Rejected</td>
      </tr>
      <tr className="border-t">
        <td className="p-3 border-r rounded-bl-lg">3.</td>
        <td className="p-3 border-r">Ayaan Raje</td>
        <td className="p-3 border-r">Study Leave</td>
        <td className="p-3 border-r">10-05-2025</td>
        <td className="p-3 border-r">11-05-2025</td>
        <td className="p-3 border-r">23-03-2025</td>
        <td className="p-3 border-r font-semibold">13</td>
        <td className="p-3 rounded-br-lg text-gray-600 font-semibold">Pending</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
}
