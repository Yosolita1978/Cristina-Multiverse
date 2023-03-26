import React from "react";
import Eyes from "../assets/bearock.jpg"


const Header = () => {

    return (
        <div className="header">
            <h1>Cristina's Multiverse</h1>
            <img className="header-img" alt="Crazy Eyes Multiverse" src={Eyes} />
        </div>
    )
};

export default Header;