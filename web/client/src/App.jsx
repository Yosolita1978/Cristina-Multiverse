import './App.css'
import React, { useState, useEffect } from 'react'
import MyForm from './components/promptform';
import MyCard from './components/cards';
import Header from './components/header';
import Spinner from "./components/spninner"



function App() {
   
  const [message, setMessage] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);


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
        //console.log(data);
        setPrompts(data);
        console.log(prompts);
      });
  }
  
  useEffect(() => {
    callBackend();
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
            {prompts.map((object, index) => (
            <li key={index}>
            <MyCard key={object.id} prompt={object.prompt} photo={object.photo} is64={true} />
            </li>
        ) )}
      </ul>
      </section>
    </>
  )
}

export default App
