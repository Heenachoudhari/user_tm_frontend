'use client';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Userloginpage() {
  const router = useRouter(); // Initialize the router

  // Function to handle form submission (or any other event for routing)
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Example of routing to a dashboard page after successful login
    router.push('/dashboard'); // Redirect to a dashboard page (or any page you want)
  };

  // Function to navigate to the sign-up page
  const handleSignUp = () => {
    router.push('/signup'); // Redirect to the sign-up page
  };

  // Function to navigate to the forgot password page
  const handleForgotPassword = () => {
    router.push('/forgotpassword'); // Redirect to the forgot password page
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex w-full h-screen shadow-lg rounded-none overflow-hidden">

        {/* Left Panel with local background image */}
        <div className="w-1/2 h-full bg-[url('/loginbg1.png')] bg-cover bg-center p-8 flex flex-col justify-center items-center relative">
          <div className="absolute left-0 top-0 w-0 h-0 border-l-[100px] border-l-transparent "></div>
          <img
            src="/logo.png"
            alt="Task Manager Icon"
            className="w-60 h-60 "
          />
          <h1 className="pt-1 text-4xl font-bold text-black mb-4">Welcome Back!</h1>
          <img
            src="/logimage.png"
            alt="Illustration"
            className="w-119 h-80 mb-5"
          />
          <p className="text-2xl text-black text-center px-4 rounded">
            A simple and intuitive task manager to organize,<br />
            track, and prioritize your tasks.
          </p>
        </div>

        {/* Right Panel with local background image */}
        <div className="w-1/2 h-full bg-[url('/loginbg2.png')] bg-cover bg-center p-10 text-white flex flex-col backdrop-brightness-75">
          <div className="mt-10">
            <h1 className="text-3xl font-semibold mb-20 text-center margin top-3">User Login</h1>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-1xl mb-1">E-mail / Phone</label>
                <input
                  type="text"
                  placeholder="Enter your email or phone"
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-1xl mb-1">Password</label>
                <input
                  type="text"
                  placeholder="Enter 8-digit password"
                  required
                  pattern="\d{8}"
                  maxLength={8}
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-500 outline-none"
                />
                <a
                  href="#"
                  onClick={handleForgotPassword} // Handle forgot password click
                  className="text-md text-right block mt-1 text-cyan-200 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
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
                onClick={handleSignUp} // Handle sign-up click
                className="text-cyan-200 text-1xl"
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
