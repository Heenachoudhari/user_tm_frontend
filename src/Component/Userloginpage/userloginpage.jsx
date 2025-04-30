export default function Userloginpage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl h-full md:h-[90vh] shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-1/2 bg-cyan-200 p-8 flex flex-col justify-center items-center relative">
          <div className="absolute left-0 top-0 w-0 h-0 border-l-[100px] border-l-transparent border-t-[100px] border-t-cyan-700"></div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5969/5969034.png"
            alt="Task Manager Icon"
            className="w-16 h-16 mb-4"
          />
          <h2 className="text-xl font-bold mb-2">TASK MANAGER</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Illustration"
            className="w-40 h-40 mb-4"
          />
          <p className="text-sm text-gray-700 text-center px-4">
            A simple and intuitive task manager to organize, track, and prioritize your tasks.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-cyan-700 p-10 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">User Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">E-mail / Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white text-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-white text-black outline-none"
              />
              <a href="#" className="text-xs text-right block mt-1 text-white hover:underline">
                Forget Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded"
            >
              Login
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Don't have an account? <a href="#" className="text-cyan-400 underline">Sign Up for Free</a>
          </p>
        </div>
      </div>
    </div>
  );
}
