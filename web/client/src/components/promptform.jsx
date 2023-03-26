import React, { useState } from 'react';



const MyForm = (props) => {

    const [prompt, setPrompt] = useState("");

    const handlePromptChange = (e) =>{
        let newPrompt = e.target.value;
        //console.log(newPrompt);
        setPrompt(newPrompt);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(prompt);
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
        </form>
    )

}

export default MyForm;