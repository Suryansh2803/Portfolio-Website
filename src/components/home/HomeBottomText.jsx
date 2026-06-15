import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
   <div className='font-[font2] flex items-center justify-center gap-2'>
      
      <div className='border-3 hover:border-[#D3FD50] hover:text-[#D3FD50] h-44 flex items-center px-10 border-white rounded-full uppercase'>
        <Link className='text-[6vw] mt-6' to='/projects'>
          Projects
        </Link>
      </div>

      <div className='border-3 hover:border-[#D3FD50] hover:text-[#D3FD50] h-44 flex items-center px-10 border-white rounded-full uppercase'>
        <Link className='text-[6vw] mt-6' to='/agence'>
          agence
        </Link>
      </div>

    </div>
  )
}

export default HomeBottomText