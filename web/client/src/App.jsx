import './App.css'
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MyForm from './components/promptform';
import MyCard from './components/cards';
import Header from './components/header';
import Spinner from "./components/spninner"



function App() {

  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();

  const [message, setMessage] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCristina, setIsCristina] = useState(false);


  const callBackend = () => {
    // A function to show that the backend is working
    fetch("/api/model")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
      });
  }

  const callDb = () => {
    if (!message) {
      return
    }
    // A function to show that the backend is working
    fetch("/api/photos")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPrompts(data);
      });
  }

  useEffect(() => {
    callBackend();
  }, []);

  useEffect(() => {
    callDb();
  }, [message])

  //A function to handle the post request
  const postPrompt = async (newPrompt) => {
    setLoading(true);
    let response;
    try {
      response = await fetch("/api/multiverse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newPrompt })
      })
      const data = await response.json();
      //console.log("From the post ", data)
      setPrompts((prompts) => [...prompts, data]);
      callDb();
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  const handleLogin = () => {
    loginWithPopup();
    setIsCristina(true);
  }

  //A function to handle the Delete funtionality
  const onDelete = async (id) => {
    try {
      console.log(id);
      const requestOptions = {
        method: 'DELETE',
      };

      const response = await fetch(`/api/multiverse/${id}`, requestOptions);
      const data = await response.json();
      //console.log(data);
      if(data.msg){
        callDb();
      }
      //callDb();
    } catch (error) {
      console.log(error);
    }
  }

  const date = new Date();

  return (
    <>
      <Header loginWithPopup={handleLogin} logout={logout} />
      <main>
        <h1>Let's create Cristina's Multiverse</h1>
        {isAuthenticated ? <p>{`Welcome ${user.nickname} - Master User`}</p> : null}
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
              <MyCard key={object.id} id={object.id} prompt={object.prompt} photo={object.photo} is64={true} user={isCristina} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default App
