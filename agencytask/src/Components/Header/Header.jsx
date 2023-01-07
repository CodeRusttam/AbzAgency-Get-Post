import React from 'react'
import logo from '../../img/Logo.png'
const Header = () => {
  return (
    <div className='w-full bg-white'>
      <div className="flex justify-between items-center p-3">
        <img src={logo} alt="" />
       <div className='flex justify-between'>
             <button className='btn mr-3'>Users</button>
             <button className='btn'>Sign Up</button>
          </div>
      </div>
    </div>
  )
}

export default Header