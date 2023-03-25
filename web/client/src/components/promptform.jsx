import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";


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
        <Form className='form-prompt' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Prompt for the Multiverse</Form.Label>
                <input
                    type="text"
                    id="add-prompt"
                    placeholder="An oil portrait of ecrodriguez in the style of Rembrandt"
                    required
                    value={prompt}
                    onChange={handlePromptChange}
                />
            </Form.Group>
            <Button type="submit" variant="outline-success">Create</Button>
        </Form>
    )

}

export default MyForm;