import { useState, useContext } from 'react'
import "./App.css";
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import {datacontext} from "./context/UserContext"
import Speak from "./assets/speak.gif"
import aiVoice from "./assets/aiVoice.gif"

function App() {
  let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse} = useContext(datacontext);

  return (
    <>
      <div className='main'>
        <img src={va} alt="Virtual Assistant" id="saara"/>
        <span>I'm Saara, Your Advanced Virtual Assistant</span>
        {
          !speaking ? 
            <button onClick={()=>{
              setPrompt("listening...")
              recognition.start()
              setSpeaking(true)
              setResponse(false)
              }}>Click Here <CiMicrophoneOn />
            </button> : 
            <div className="response">
              {
                response?
                <img src={aiVoice} id="aigif"/>
                :
                <img src={Speak} id="speak"/>
              }
              <p>{prompt}</p>
              
            </div>
        }

      </div>
    </>
  )
}

export default App
