import React from 'react';


const MyCard = (props) => {

    return (
        <div className="container" >
        <div className="card">
            <img className="w-full" src={props.photo} alt={props.prompt}></img>
            <p className="text-gray-700 text-base">{props.prompt}</p>
        </div>
        </div>

    )
};

export default MyCard;