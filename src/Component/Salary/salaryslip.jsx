'use client';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function SalarySlipPage() {
    const pdfRef = useRef();

    const handleDownloadPdf = async () => {
        try {
            const element = pdfRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save('salary-slip.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white">
            {/* Download Button */}
            <div className="text-right mb-4">
                <button 
                    onClick={handleDownloadPdf}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
            </div>
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border rounded-lg mt-10 font-sans text-sm">
            <div className="mb-6">
                <div className="text-sm font-bold bg-orange-200 p-2">Salary Slip</div>
                <div className="mt-2">
                    <p className="font-semibold">ISRC</p>
                    <p>Kurla, Mumbai</p>
                    <p>iscr.orgin.com | 8976104646</p>
                </div>
            </div>

            <div className="flex justify-center items-center border-b pb-4">
                <p>PaySlip for the Month of September 2025</p>
            </div>

            <div className="grid grid-cols-2 gap-8 py-8">
                {/* Employee Summary Left */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Employee Pay Summary</h2>
                    <p><strong>Employee Name:</strong> Prashant Patil</p>
                    <p><strong>Designation:</strong> Co-Founder</p>
                    <p><strong>Date of Joining:</strong> 8-May-2020</p>
                    <p><strong>Pay Period:</strong> September 2025</p>
                    <p><strong>Pay Date:</strong> 30-Sep-2025</p>
                    <p><strong>Account #:</strong> 000-0000-4255</p>
                    <p><strong>Location:</strong> Ghansoli</p>
                </div>

                {/* Net Pay Summary Right */}
                <div className="bg-green-100 border border-green-400 text-center rounded-lg px-4 py-2 self-start">
                    <p className="text-xs font-semibold">Employee Net Pay</p>
                    <p className="text-2xl font-bold text-green-600">₹50,213.95</p>
                    <p className="text-sm">Paid Days: 30</p>
                </div>
            </div>

            {/* Headers Row */}
            <div className="grid grid-cols-4 bg-orange-100 font-semibold text-center">
                <div>EARNINGS</div>
                <div>AMOUNT</div>
                <div>DEDUCTIONS</div>
                <div>AMOUNT</div>
            </div>

            <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-sm">
                <div className="space-y-1">
                    <p>Basic Salary</p>
                    <p>House Rent Allowance</p>
                    <p>Conveyance</p>
                    <p>Medical</p>
                    <p>Special Allowance</p>
                    <p>Other</p>
                    <p className="font-semibold border-t pt-2">Gross Salary</p>
                </div>
                <div className="space-y-1">
                    <p>₹50,600.00</p>
                    <p>₹200.00</p>
                    <p>₹150.00</p>
                    <p>₹150.00</p>
                    <p>₹300.00</p>
                    <p>₹10.00</p>
                    <p className="font-semibold border-t pt-2">₹6,432.50</p>
                </div>
                <div className="space-y-1">
                    <p>EPF</p>
                    <p>Health Insurance</p>
                    <p>Professional Tax</p>
                    <p>TDS</p>
                    <p className="font-semibold border-t pt-2">Total Deductions</p>
                </div>
                <div className="space-y-1">
                    <p>₹800.00</p>
                    <p>₹356.36</p>
                    <p>₹62.55</p>
                    <p>₹0.00</p>
                    <p className="font-semibold border-t pt-2">₹1,218.55</p>
                </div>
            </div>

            {/* Net Pay */}
            <div className="mt-6">
                <h3 className="font-semibold">NET PAY</h3>
                <p className="text-xl font-bold text-green-600">₹50,213</p>
                <p className="text-sm italic">Amount in Words: Five Thousand Two Hundred and Thirteen Dollar & 95/100</p>
            </div>

            {/* Reimbursements */}
            <div className="grid grid-cols-4 bg-orange-100 font-semibold text-center mt-6 mb-2">
                <div>REIMBURSEMENTS</div>
                <div>AMOUNT</div>
                <div></div>
                <div></div>
            </div>

            <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-sm">
                <div className="space-y-1">
                    <p>Mobile Bill</p>
                    <p>Travel</p>
                    <p>Food</p>
                    <p className="font-semibold border-t pt-2">Total Reimbursements</p>
                </div>
                <div className="space-y-1">
                    <p>₹50.00</p>
                    <p>₹30.00</p>
                    <p>₹20.00</p>
                    <p className="font-semibold border-t pt-2">₹100.00</p>
                </div>
            </div>

            {/* Final Net Payable */}
            <div className="bg-orange-100 mt-6 p-4 rounded-lg text-center">
                <p className="text-xl font-bold text-orange-700">TOTAL NET PAYABLE: ₹50,313</p>
                <p className="text-sm italic">(Five Thousand Three Hundred and Thirteen Ruppees)</p>
            </div>
        </div>
        </div>
    );
}
