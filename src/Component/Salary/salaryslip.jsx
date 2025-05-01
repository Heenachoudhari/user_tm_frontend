'use client';
// components/SalarySlip.jsx
import { useRef } from "react";
import html2pdf from "html2pdf.js";

const SalarySlip = ({ employee }) => {
    const slipRef = useRef();

    const downloadPDF = () => {
        const element = slipRef.current;
        const opt = {
            margin: 0.5,
            filename: `${employee.name.replace(/\s+/g, '_')}_SalarySlip.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <>
            <div className="text-right max-w-4xl mx-auto mt-4">
                <button
                    onClick={downloadPDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2"
                >
                    Download PDF
                </button>
            </div>

            <div
                ref={slipRef}
                id="salary-slip"
                className="p-8 bg-white text-black max-w-4xl mx-auto shadow-md relative"
            >
                {/* Watermark */}
                <img
                    src="/watermark.png"
                    alt="Watermark"
                    className="absolute opacity-10 top-1/3 left-1/4 w-1/2 pointer-events-none"
                />

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <img src="/logo.png" alt="Logo" className="h-16" />
                    <p className="text-sm text-right">
                        Office No. B1A & 2, New White House, Buddha Colony,<br />
                        Kurla West, Mumbai, Maharashtra, 400070
                    </p>
                </div>

                <h2 className="text-xl font-bold my-4">
                    Salary Slip ({employee.dateRange})
                </h2>

                {/* Employee Info */}
                <div className="grid grid-cols-3 gap-4 border p-4 mb-4 text-sm">
                    <p><strong>{employee.name}</strong></p>
                    <p><strong>Phone No:</strong> {employee.phone}</p>
                    <p><strong>Monthly Gross Salary:</strong> ₹{employee.salary}</p>
                    <p><strong>Emp ID:</strong> {employee.empId}</p>
                    <p><strong>Account No:</strong> {employee.accountNo}</p>
                </div>

                {/* Payment */}
                <h3 className="font-semibold text-base mb-1">
                    Payment & Salary ({employee.dateRange})
                </h3>
                <div className="border p-4 mb-4">
                    <p><strong>Net Payable (Earnings):</strong> ₹{employee.netPayable}</p>
                </div>

                {/* Attendance Summary */}
                <h3 className="font-semibold text-base mb-1">
                    Attendance Summary ({employee.dateRange})
                </h3>
                <div className="border p-4 text-sm">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <p>Present - {employee.present}</p>
                        <p>Absent - {employee.absent}</p>
                        <p>Half Day - {employee.halfDay}</p>
                        <p>Not Marked - {employee.notMarked}</p>
                        <p>Overtime - {employee.overtime}</p>
                        <p>Fine - {employee.fine}</p>
                        <p>Leaves - {employee.leaves}</p>
                        <p>Payable Days - {employee.payableDays}</p>
                    </div>
                    <table className="w-full text-center border mt-4">
                        <thead>
                            <tr className="border">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                    <th key={day} className="border px-2 py-1">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {employee.attendance.map((val, i) => (
                                    <td key={i} className="border px-2 py-1">{val}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-wrap text-xs mt-3 gap-3">
                        <p><b>P</b> Present</p>
                        <p><b>A</b> Absent</p>
                        <p><b>HD</b> Half Day</p>
                        <p><b>WO</b> Weekly Off</p>
                        <p><b>PCO</b> Present (Comp Off)</p>
                        <p><b>HDCO</b> Half Day (Comp Off)</p>
                        <p><b>L</b> Leave</p>
                        <p><b>H</b> Holiday</p>
                    </div>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                    <img src="/signature.png" alt="Signature" className="h-12 inline-block" />
                    <p className="text-sm">Authorized Signature</p>
                </div>
            </div>
        </>
    );
};

export default SalarySlip;
