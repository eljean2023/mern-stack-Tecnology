import React from 'react'

const ShareScreenButton = ({onClick}) => {
 
  return (
    <div>
        <i onClick={onClick} className="fa fa-laptop" aria-hidden="true"></i>
        
        {
            /*
            <i class="fa fa-microphone" aria-hidden="true"></i>
            <i class="fa fa-microphone-slash" aria-hidden="true"></i>
            <i class="fas fa-video-camera" aria-hidden="true"></i>
            */
        }
        
    </div>
  )
}

export default ShareScreenButton