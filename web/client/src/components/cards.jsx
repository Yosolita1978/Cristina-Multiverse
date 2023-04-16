import React from 'react';


const MyCard = (props) => {

    let url;
    if(props.is64){
        url = `data:image/jpeg;base64,${props.photo}`;
    } else{
        url = props.photo;
    }

    const handleDelete = (id) => {
        props.onDelete(id);
    }

    return (
        <div className="container" >
        <div className="card">
            <img className="w-full" src={url} alt={props.prompt}></img>
            <p className="text-gray-700 text-base">{props.prompt}</p>
            {props.user ? <button onClick={() => {handleDelete(props.id)}}>Delete</button> : null}
        </div>
        </div>

    )
};

export default MyCard;