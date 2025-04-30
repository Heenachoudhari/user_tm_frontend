'use client';
import { Toaster, toast } from 'react-hot-toast';
export default function Forgotpassword() {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('OTP sent successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/loginbg.png')] bg-cover bg-center relative">
      {/* Main card */}
      <div className="relative bg-white rounded-lg shadow-lg p-12 w-full max-w-3xl z-10 h-120 text-center">

        <h2 className="text-[#0077B6] text-3xl font-extrabold mb-6">
          Forgot Password
        </h2>
        <h3 className="text-black text-3xl font-extrabold mb-9">
          Request OTP
        </h3>


        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Label aligned to the left */}
          
          <div className="max-w-6xl">
            <div className="text-left md:px-22">
              <label className="block text-md font-medium mb-1">E-mail / Phone</label>
            </div>

            {/* Input field with increased width */}
            <div className="flex justify-center">
              <input
                type="text"
                className="w-[500px] px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none"
                placeholder="Enter your email or phone"
                required
              />
            </div>
          </div>
          <div className="md:mt-15">
            <button
              type="submit"
              className="p-24 bg-[#018ABE] text-white font-bold py-2 text-[20px] rounded-lg hover:bg-[#005f94] cursor-pointer transition"
            >
              Send OTP
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
