
import NavBar from "@/Component/Navbar/navbar";
import Sidebar from "@/Component/Usersidebar/usersidebar";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

function page() {
    return (
        <div className="min-h-screen md:flex bg-white">

            {/* Desktop Sidebar Section (visible on md+) */}
            <div className="md:w-1/6 ">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
                {/* Desktop Navbar (hidden on mobile) */}
                <NavBar />
                <div className="flex flex-col gap-6 py-4 px-12 pr-24">
                    {/* Header + Edit Button */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-[700]">My Profile</h1>
                            <div className="h-1 w-[70%] bg-[#FFB006] mt-1"></div>
                        </div>
                        <button className="px-7 rounded-2xl h-12 text-lg font-semibold flex items-center gap-3 bg-[#018ABE] cursor-pointer text-white"><span className="text-black"><FaRegEdit /></span>Edit</button>
                    </div>
                    {/* Profile Card */}
                    <div className="w-full h-78 bg-linear-to-b from-[#018ABE] to-[#004058] rounded-2xl relative shadow-xl mb-8">
                        <Image src="/profile/lock.png" alt="Lock Icon" width={107} height={107} className="absolute opacity-50 top-4 left-4 -rotate-[19.89deg]" />
                        <Image src="/profile/Vector92.png" alt="Vector" width={57} height={69} className="absolute opacity-50 bottom-8 left-8" />
                        <Image src="/profile/PP.png" alt="Profile Picture" width={1000} height={1000} className="absolute top-10 left-[10%] h-[220px] w-[235px]" />
                        <Image src="/profile/flagVector.png" alt="Flag Vector" width={49} height={71} className="absolute opacity-50 top-10 left-[33%]" />
                        <Image src="/profile/pencil.png" alt="Vector" width={113} height={147} className="absolute opacity-50 top-6 left-[45%]" />
                        <Image src="/profile/key.png" alt="Key Icon" width={151} height={150} className="absolute opacity-50 bottom-2 left-[35%]" />
                        <div className="absolute top-16 right-[15%] text-white">
                            <h1 className="text-4xl font-[700] mb-2">Prashant Patil</h1>
                            <h2 className="text-3xl font-[400] mb-2">9321625553</h2>
                            <h3 className="text-3xl font-[400] mb-2">xyz@gmail.com</h3>
                            <h4 className="text-3xl font-[400] mb-2">Graphic Designer Intern</h4>
                        </div>
                        <Image src="/profile/flippedFlag.png" alt="Flipped Flag" width={68} height={125} className="absolute opacity-50 top-5 right-[5%]" />
                        <Image src="/profile/flippedPencil.png" alt="Flipped Pencil" width={113} height={147} className="absolute opacity-50 bottom-10 right-[10%]" />
                    </div>
                    {/* Form */}
                    <form className="flex flex-col gap-8 w-full mb-8">
                        <div className="flex justify-between w-full gap-28">
                            <div className="w-full flex flex-col">
                                <label htmlFor="fName" className="text-xl font-[400]">First Name</label>
                                <input type="text" id="fName" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none " />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="lName" className="text-xl font-[400]">Last Name</label>
                                <input type="text" id="lName" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                        </div>
                        
                        <div className="flex justify-between w-full gap-28">
                            <div className="w-full flex flex-col">
                                <label htmlFor="mobile" className="text-xl font-[400]">Mobile Number</label>
                                <input type="text" id="mobile" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="email" className="text-xl font-[400]">Email Address</label>
                                <input type="email" id="email" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex justify-between w-full gap-28">
                            <div className="w-full flex flex-col">
                                <label htmlFor="designation" className="text-xl font-[400]">Designation</label>
                                <input type="text" id="designation" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="gender" className="text-xl font-[400]">Gender</label>
                                <input type="text" id="gender" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex justify-between w-full gap-28">
                            <div className="w-full flex flex-col">
                                <label htmlFor="address" className="text-xl font-[400]">Address</label>
                                <textarea rows={3} id="address" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none resize-none" />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="doJ" className="text-xl font-[400]">Date of Joining</label>
                                <input type="text" id="doJ" className="w-[full] px-4 py-2 rounded-xl shadow-[0px_3px_6px_rgba(0,0,0,0.4)] focus:outline-none" />
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 w-full">
                            <button type="submit" className="px-24 py-3 rounded-xl text-white bg-[#018ABE] hover:bg-[#004058] shadow-[0px_2px_8px_rgba(0,0,0,0.4)] ">Save</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default page;
