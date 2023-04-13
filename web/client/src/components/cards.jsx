import React from 'react';


const MyCard = (props) => {

    let url;
    if(props.is64){
        url = `data:image/jpeg;base64,${props.photo}`;
    } else{
        url = props.photo;
    }

    return (
        <div className="container" >
        <div className="card">
            <img className="w-full" src={url} alt={props.prompt}></img>
            <p className="text-gray-700 text-base">{props.prompt}</p>
        </div>
        </div>

    )
};

export default MyCard;