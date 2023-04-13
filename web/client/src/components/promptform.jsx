import React, { useState } from 'react';



const MyForm = (props) => {

    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState("");

    const handlePromptChange = (e) =>{
        let newPrompt = e.target.value;
        //console.log(newPrompt);
        setPrompt(newPrompt);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let myName = "ecrodriguez";
        let userPrompt = prompt.toLowerCase();
        if(userPrompt.includes(myName)){
            props.onSubmit(prompt);
            setMessage("");
            //to clean the form;
            setPrompt("");
        } else{
            setMessage(`I'm sorry you didn't search for something with my name: ${myName}. I cannot search for random things...yet`);
            //to clean the form;
            setPrompt("");
        }

        
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
                <label>Prompt for the Multiverse</label>
                <input
                    type="text"
                    id="add-prompt"
                    placeholder="An oil portrait of ecrodriguez in the style of Rembrandt"
                    required
                    value={prompt}
                    onChange={handlePromptChange}
                />
            <button  variant="outline-success">Create</button>
            <div>
                {!message ? null : <p>{message}</p>}
            </div>
        </form>
    )

}

export default MyForm;