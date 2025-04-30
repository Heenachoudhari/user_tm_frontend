'use client';

import { Toaster, toast } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image'; // Import Image from next/image

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [validationMessage, setValidationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Password length validation
    if (formData.password.length !== 8) {
      setValidationMessage('Password must be exactly 8 characters long.');
      setIsSubmitting(false);
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    toast.success('Registered successfully!');
    console.log(formData); // You can send this to your backend

    // Navigate to the login page after successful registration
    router.push('/'); // Redirect to the login page

    setIsSubmitting(false); // Reset submitting state after success
  };

  const navigateToLogin = () => {
    router.push('/'); // Navigate to login page on image click
  };

  return (
    <div className="flex flex-row h-screen">
      
      {/* Left Side */}
      <div
        className="w-2/5 h-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/signup/bgleft1.png')" }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* Use the Image component for the logo */}
          <Image 
            src="/signup/tasklogo.png" 
            alt="Logo" 
            width={200} 
            height={50} 
          />
          <Image 
            src="/signup/image1.png" 
            alt="Background Image"
            width={300}
            height={150} 
            className="w-100 -mt-20 h-auto" 
          />
        </div>
      </div>

      {/* Right Side */}
      <div
        className="w-3/5 flex flex-col items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: "url('/signup/bgright.png')" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 mt-0">
          Create an Account
        </h2>

        <div className="bg-cyan-50 p-8 rounded-2xl shadow-xl w-full max-w-xl">
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className=" text-gray-900 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName" className=" text-gray-900 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className=" text-gray-900 mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className=" text-gray-900 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                pattern="[0-9]{10}"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className=" text-gray-900 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className=" text-gray-900 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full p-3 rounded-xl border border-gray-500 focus:outline-none bg-white text-black"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {validationMessage && (
              <div className="col-span-2 text-red-500 text-center mt-2">
                {validationMessage}
              </div>
            )}

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-300 hover:bg-cyan-400 text-black font-bold mt-2 cursor-pointer"
                disabled={isSubmitting} // Disable button while submitting
              >
                Sign Up
              </button>
              <p>
                Already have an account? 
                <span 
                  className="text-cyan-200 cursor-pointer" 
                  onClick={navigateToLogin}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
