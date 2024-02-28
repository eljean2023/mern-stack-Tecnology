import React, { useEffect, useRef } from 'react'

export default function VideoPlayerRoom({stream}) {
    const videoRef = useRef()
useEffect(()=>{
    if(videoRef.current && stream) videoRef.current.srcObject = stream; 
}, [stream])
    return (<div> 
        <div > 
                                 {/*controls*/}            
            <video className='videoStyle' ref={videoRef} controls autoPlay/> 
        </div> 
    </div> 
  )
}
