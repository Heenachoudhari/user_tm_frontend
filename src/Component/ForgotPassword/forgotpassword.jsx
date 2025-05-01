'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Forgotpassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/forgotpassword/generate-otp', {
        email,
      });

      localStorage.setItem("email", email);

      if (res.status === 200) {
        toast.success('OTP sent successfully!');
        router.push('/verifyotp');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/forgotpassword/generate-otp', {
        email,
      });

      if (res.status === 200) {
        toast.success('OTP resent successfully!');
      } else {
        toast.error('Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to resend OTP. Try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/loginbg.png')] bg-cover bg-center relative">
      <div className="relative bg-white rounded-lg shadow-lg p-12 w-full max-w-3xl z-10 h-120 text-center">
      <Image src="/image2.png" alt ="vector" height={100} width={100} className="absolute top-204.71px left-432.82px rotation-160.01 deg z-0 "/>
        <Image src="/image1.png" alt="vector" height={70} width={60} className="absolute top-15 right-10 z-0" />
        <Image src="/image8.png" alt="vector" height={80} width={80} className="absolute top-50 left-5 rotate-[350deg] z-[-1]" />
        <Image src="/image3.png" alt="vector" height={80} width={80} className="absolute bottom-14 left-25 right-30 rotate-[350deg] z-0" />
        <Image src="/image4.png" alt="vector" height={80} width={80} className="absolute top-40 right-40 rotate-[15deg] z-0" />
        <Image src="/image7.png" alt="vector" height={80} width={80} className="absolute top-77 right-10 left-128 z-0" />
        <Image src="/image5.png" alt="vector" height={85} width={85} className="absolute top-64 left-51 z-[-1]" />
        <Image src="/image6.png" alt="vector" height={80} width={80} className="absolute top-7 right-50 z-0" />

        <h2 className="text-[#0077B6] text-3xl font-extrabold mb-6 z-10">Forgot Password</h2>
        <h3 className="text-black text-3xl font-extrabold mb-9 z-10">Request OTP</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-w-6xl">
            <div className="text-left text-black md:px-22">
              <label htmlFor="email" className="block text-lg font-medium mb-1 z-10">
                E-mail / Phone
              </label>
            </div>
            <div className="flex justify-center relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[500px] px-4 py-2 pr-28 bg-white shadow-md border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black z-10"
                placeholder="Enter your email address"
                required
              />
              {/* Resend OTP Button */}
              <button
                type="button"
                onClick={handleResend}
                className="absolute leading-10 cursor-pointer right-25 top-10 text-lg  text-black hover:text-blue-600 z-10"
              >
                Resend OTP?
              </button>
            </div>
          </div>

          <div className="md:mt-15 z-10">
            <button
              type="submit"
              className="bg-[#018ABE] text-white font-bold py-2 px-25 text-[20px] rounded-lg hover:bg-[#005f94] cursor-pointer z-10"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
