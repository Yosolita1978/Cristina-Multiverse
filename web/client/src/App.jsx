import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import MyForm from './components/promptform';


function App() {

  const [message, setMessage] = useState(null);
  const [prompts, setPrompts] = useState([]);

  const callBackend = () => {
    // A function to show that the backend is working
    fetch("http://localhost:8080/api/model")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
      });
  }

  useEffect(() => {
    callBackend();
}, [message]);

    //A function to handle the post request
    const postPrompt = (newPrompt) => {
      return fetch("http://localhost:8080/api/multiverse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({prompt: newPrompt}),
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              console.log("From the post ", data);
              //I'm sending data to the state for updating the list of prompts
              setPrompts((prompts) => {[...prompts, data]});
          });
  };

  return (
    <div className="App">
      {!message ? <p>Hello stranger</p> : <MyForm onSubmit={postPrompt} /> }
    </div>
  )
}

export default App
