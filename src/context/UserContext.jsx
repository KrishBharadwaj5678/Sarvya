import React, {createContext, useState} from 'react'
import run from "../gemini.js"

export let datacontext=createContext();

const UserContext = ({children}) => {

  let [speaking,setSpeaking] = useState(false);
  let [prompt,setPrompt] = useState("listening...");
  let [response,setResponse] = useState(false);

  function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume=1;
    text_speak.rate=1.5;
    // text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang="en-GB";
    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(text_speak)
  }

   let aiResponse = async (prompt) => {
     let text = await run(prompt);
     let cleanedText = text.replace(/\*/g, "");
     let updatedText = cleanedText.split(" ").slice(0,50).join(" ").replace("Google","Krish Bharadwaj").replace("google","Krish Bharadwaj")
     setPrompt(updatedText);
     speak(updatedText);
     setResponse(true);
     setTimeout(() => {
       setSpeaking(false);
     }, 5000);
   }

   let takeCommand = (command) =>{
      if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com","_blank");
        speak("Opening Youtube...");
        setPrompt("Opening Youtube...");
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com","_blank");
        speak("Opening Google...");
        setPrompt("Opening Google...");
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("github")){
        window.open("https://github.com/KrishBharadwaj5678","_blank");
        speak("Opening your Github...");
        setPrompt("Opening your Github...");
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("linkedin")){
        window.open("https://www.linkedin.com/in/krishbharadwaj23","_blank");
        speak("Opening your Linkedin Account...");
        setPrompt("Opening your Linkedin Account...");
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      } else if(command.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(`Current Time is ${time}`);
        setPrompt(time);
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      } else if(command.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"})
        speak(`Current Date is ${date}`)
        setPrompt(date);
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }
      else{
        aiResponse(command)
      }
   }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult=(e)=>{  
   let transcript = e.results[0][0].transcript;
   setPrompt(transcript);
   takeCommand(transcript.toLowerCase())
  }
  
  let value={
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return (
    <>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </>
  )
}

export default UserContext



