'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function Userloginpage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (pwd) => {
    const lengthValid = pwd.length === 8;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);
    return lengthValid && hasLetter && hasNumber && hasSymbol;
  };

  const isPhoneNumber = (input) => {
    return /^\d{10}$/.test(input);
  };

  const isEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const isNumeric = /^\d+$/.test(emailOrPhone);

    if (isNumeric) {
      if (!isPhoneNumber(emailOrPhone)) {
        setError('Phone number must be exactly 10 digits.');
        return;
      }
    } else {
      if (!isEmail(emailOrPhone)) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    if (!validatePassword(password)) {
      setError('Password must be 8 characters and include at least one letter, number, and special character.');
      return;
    }

    setError('');
    toast.success('Login Successful!');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgotpassword');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" />
      <div className="flex w-full h-screen shadow-lg rounded-none overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 h-full bg-[url('/loginbg1.png')] bg-cover bg-center p-8 flex flex-col justify-center items-center relative">
          <Image src="/logo.png" alt="Task Manager Icon" className="w-60 h-60" width={240} height={240} />
          <h1 className="pt-1 text-4xl font-bold text-black mb-4">Welcome Back!</h1>
          <Image src="/logimage.png" alt="Illustration" className="w-119 h-80 mb-5" width={400} height={320} />
          <p className="text-2xl text-black text-center px-4 rounded">
            A simple and intuitive task manager to organize,<br />
            track, and prioritize your tasks.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 h-full bg-[url('/loginbg2.png')] bg-cover bg-center p-10 text-white flex flex-col backdrop-brightness-75">
          <div className="mt-10">
            <h1 className="text-3xl font-semibold mb-20 text-center">User Login</h1>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-1xl mb-1">E-mail / Phone</label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and limit to 10 digits
                    if (/^\d{0,10}$/.test(value)) {
                      setEmailOrPhone(value);
                    }
                  }}
                  placeholder="Enter your email or phone"
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-500 outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-1xl mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 8-character secure password"
                  required
                  maxLength={8}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-500 outline-none pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-10 right-3 text-xl text-gray-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-md text-right block mt-1 text-cyan-200 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {error && <p className="text-red-300 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg text-1xl cursor-pointer"
              >
                Login
              </button>
            </form>

            <p className="text-1xl mt-4 text-center">
              Don't have an account?{' '}
              <a
                href="#"
                onClick={handleSignUp}
                className="text-cyan-200 text-1xl hover:underline"
              >
                Sign Up for Free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
