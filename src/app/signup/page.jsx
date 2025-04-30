
import Signup from '@/Component/usersignup/usersignup';


import React from 'react'

export default function Home() {
  return (
  
    <div>
      {/* Desktop view (hidden on mobile) */}
      <div className="hidden md:block">
       <Signup/>
      </div>

      {/* Mobile view (hidden on desktop) */}
      
    </div>
  );
}


