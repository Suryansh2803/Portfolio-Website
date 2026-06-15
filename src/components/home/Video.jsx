import React from 'react'
import homeVideo from '../../assets/HomeVIdeo.mp4'

const Video = () => {
  return (
    <div className='h-full w-full'>
      <video className='h-full w-full object-cover' src={homeVideo} autoPlay loop muted></video>
    </div>
  )
}

export default Video