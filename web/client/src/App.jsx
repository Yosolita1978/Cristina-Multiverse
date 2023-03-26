import './App.css'
import React, { useState, useEffect } from 'react'
import MyForm from './components/promptform';
import MyCard from './components/cards';
import Header from './components/header';
import Eduard from "../src/assets/Eduard.jpg";
import StartTrek from "../src/assets/starttrek.jpg";
import Space from "./assets/austronauta.jpg";



function App() {

  //{photo: out.modelOutputs[0].image_base64, prompt: modelParameters}
    //Initial Data to see photos
    const initialData = [{
      id: 1,
      photo: Eduard,
      prompt: "A oil paint of ecrodriguez as character from Eduard Moore painting"
    }, {
      id: 2, 
      photo: StartTrek,
      prompt: "A photo of ecrodriguez in the red uniform as capitan of the enterprise in the Bew Star Trek movie"
    }, {
      id: 3, 
      photo: Space,
      prompt: "A photo of ecrodriguez as an austronaut"
    }]

    
  const [message, setMessage] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myDefault, setMyDefault] = useState([]);

  const loadInitialData = () =>{
      setMyDefault(initialData);
    }

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
    loadInitialData();
  }, []);

  //A function to handle the post request
  const postPrompt = (newPrompt) => {
    setLoading(true);
    return fetch("http://localhost:8080/api/multiverse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: newPrompt }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        //I'm sending data to the state for updating the list of prompts
        setPrompts((prompts) => { [...prompts, data] });
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <main>
        <h1>Let's create Cristina's Multiverse</h1>
        <p>
          Suggest a Stable Diffusion prompt to generate me an avatar from the multiverse. Refer to
          me as ecrodriguez (one word).
        </p>
        {!message ? <p>Hello stranger</p> : <MyForm onSubmit={postPrompt} />}
      </main>
      {loading ? <Spinner /> : null}
      {!prompts ? null : (prompts.map((prompt, index) => {
        return <MyCard key={index} prompt={prompt.prompt} photo={prompt.photo} />
      }))}
      <section className="gallery">
      <ul>
            {myDefault.map((element, index) => (
            <li key={index}>
            <MyCard key={element.id} prompt={element.prompt} photo={element.photo} />
            </li>
        ) )}
      </ul>
      </section>
    </>
  )
}

export default App
