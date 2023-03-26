import './App.css'
import React, { useState, useEffect } from 'react'
import MyForm from './components/promptform';
import MyCard from './components/cards';
import Header from './components/header';
import Eduard from "../src/assets/Eduard.jpg";
import StartTrek from "../src/assets/starttrek.jpg";
import Space from "./assets/austronauta.jpg";
import Spinner from "./components/spninner"



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
      prompt: "A photo of ecrodriguez in the red uniform as capitan of the enterprise in the New Star Trek movie"
    }, {
      id: 3, 
      photo: Space,
      prompt: "A photo of ecrodriguez  with astronaut helmets by ilya kuvshinov"
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

  const callDb = () => {
    if(!message){
      return
    } 
    // A function to show that the backend is working
    fetch("http://localhost:8080/api/photos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPrompts((prompts) => [...prompts, data]);
      });
  }
  
  useEffect(() => {
    callBackend();
    loadInitialData();
  }, []);

  useEffect(() =>{
    callDb();
  }, [message])

  //A function to handle the post request
  const postPrompt = async (newPrompt) => {
    setLoading(true);
    let response;
    try{
      response = await fetch("http://localhost:8080/api/multiverse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: newPrompt })})
      const data = await response.json();
      console.log("From the post ", data)
      setPrompts((prompts) => [...prompts, data]);
      setLoading(false);
    } catch(e){
      console.error(e);
      setLoading(false);
    }
  }

  const date = new Date();

  return (
    <>
      <Header />
      <main>
        <h1>Let's create Cristina's Multiverse</h1>
        <p>
          Suggest a Stable Diffusion prompt to generate me an avatar to add to my multiverse. Refer to
          me as ecrodriguez (one word).
        </p>
        {!message ? <p>Hello stranger</p> : <MyForm onSubmit={postPrompt} />}
      </main>
      {loading ? <Spinner /> : null}
      <p className='date'>Current multiverse at {date.toLocaleString()}</p>
      <section className="gallery">
      <ul>
            {myDefault.map((element, index) => (
            <li key={index}>
            <MyCard key={element.id} prompt={element.prompt} photo={element.photo} is64={false} />
            </li>
        ) )}
      </ul>
      </section>
      <section className="gallery">
      <ul>
            {prompts.map((prompt, index) => (
            <li key={index}>
            <MyCard key={prompt.id} prompt={prompt.prompt} photo={prompt.photo} is64={true} />
            </li>
        ) )}
      </ul>
      </section>
    </>
  )
}

export default App
