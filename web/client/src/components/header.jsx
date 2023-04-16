import React from "react";
import Eyes from "../assets/bearock.jpg"


const Header = (props) => {

    
    const handleLogin = () => {
        props.loginWithPopup();
    }

    const handleLogOut = () => {
        props.logout();
    }

    return (
        <div className="header">
            <h1>Cristina's Multiverse</h1>
            {props.user ? <a onClick={handleLogOut}>LogOut</a> : null}
            <img onClick={handleLogin} className="header-img" alt="Crazy Eyes Multiverse" src={Eyes} />
        </div>
    )
};

export default Header;