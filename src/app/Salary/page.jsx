// App.jsx
import SalarySlip from "@/Component/Salary/salaryslip";
import React from "react";


const dummyEmployee = {
  name: "Paras Khairnar",
  empId: "EMP1023",
  phone: "9876543210",
  salary: 50000,
  accountNo: "1234567890123456",
  dateRange: "April 2025",
  netPayable: 48000,
  present: 22,
  absent: 2,
  halfDay: 1,
  notMarked: 0,
  overtime: 4,
  fine: 200,
  leaves: 1,
  payableDays: 26,
  attendance: [
    "P", "P", "A", "P", "HD", "P", "WO", 
  ],
};

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <SalarySlip employee={dummyEmployee} />
    </div>
  );
};

export default App;
