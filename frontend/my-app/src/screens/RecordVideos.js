
import { ReactMediaRecorder } from "react-media-recorder";

 function RecordVideos(){
  return(
    <ReactMediaRecorder
     audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
    />
  
  )
}
export default RecordVideos
