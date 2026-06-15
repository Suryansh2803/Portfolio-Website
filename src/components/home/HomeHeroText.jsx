import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div className='font-[font1] text-6xl text-center uppercase text-white'>
      <div className='text-[9.5vw] leading-none tracking-tight'>Suryansh</div>
      <div className='text-[9.5vw] leading-none tracking-tight flex items-center justify-center'>
        Yadav
        <div className='h-[10vw] w-[16vw] ml-8 rounded-[2.5rem] overflow-hidden'>
          <Video />
        </div>
      </div>
      <div className='text-[9.5vw] leading-none tracking-tight'>Website</div>
    </div>
  )
}

export default HomeHeroText