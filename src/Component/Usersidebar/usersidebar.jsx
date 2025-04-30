'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { label: 'Dashboard', img: '/dashboard.png', href: '#' },
  { label: 'Attendance', img: '/attendance.png', href: '#' },
  { label: 'Add TimeSheet', img: '/timesheet.png', href: '#' },
  { label: 'Leave', img: '/leave.png', href: '#' },
  { label: 'Salary', img: '/salary.png', href: '#' },
  { label: 'Company Policies', img: '/company.png', href: '#' },
  { label: 'Logout', img: '/logout.png', href: '#' }
]

export default function Sidebar() {
  return (
    <div className="min-h-screen w-60 bg-gradient-to-b from-sky-700 to-sky-400 text-white flex flex-col items-center py-6">
      
      {/* Logo */}
      <div className="text-center">
        <Image src="/task.png" alt="Logo" width={200} height={300} />
       
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 w-full px-4">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center gap-3 p-2 hover:bg-white hover:text-sky-700 rounded-lg transition">
            <Image src={item.img} alt={item.label} width={30} height={30} />
            <span className="text-md">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
