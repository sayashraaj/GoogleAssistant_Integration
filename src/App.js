import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
    const [finalanswer, setFinalanswer] = useState('')
    const { transcript, resetTranscript } = useSpeechRecognition()
    useEffect(() => {
        axios.post('http://localhost:5000/', {
    textquery: transcript
  })
  .then(function (response) {
    console.log(response.data);
    setFinalanswer(response.data.answer)
  })
  .catch(function (error) {
    console.log(error);
  });
    }, [transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{finalanswer}</p>
    </div>
  )
}

export default App;