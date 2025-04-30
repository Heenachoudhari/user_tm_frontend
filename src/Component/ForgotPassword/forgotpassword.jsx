'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Forgotpassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/forgotpassword/generate-otp', {
        email,
      });

      toast.success('OTP sent successfully!');
      router.push('/verifyotp');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/loginbg.png')] bg-cover bg-center relative">
      <div className="relative bg-white rounded-lg shadow-lg p-12 w-full max-w-3xl z-10 h-120 text-center">
        <h2 className="text-[#0077B6] text-3xl font-extrabold mb-6">Forgot Password</h2>
        <h3 className="text-black text-3xl font-extrabold mb-9">Request OTP</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-w-6xl">
            <div className="text-left text-black md:px-22">
              <label htmlFor="email" className="block text-lg font-medium mb-1">
                E-mail
              </label>
            </div>
            <div className="flex justify-center">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[500px] px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black"
                placeholder="Enter your email address"
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
