import React, { useState } from "react";
import Eyes from "../assets/bearock.jpg"


const Header = (props) => {

    const [isCristina, setIsCristina] = useState(false);

    const handleLogin = () => {
        props.loginWithPopup();
        setIsCristina(true);
    }

    const handleLogOut = () => {
        props.logout();
        setIsCristina(false);
    }

    return (
        <div className="header">
            <h1>Cristina's Multiverse</h1>
            {isCristina ? <a onClick={handleLogOut}>LogOut</a> : null}
            <img onClick={handleLogin} className="header-img" alt="Crazy Eyes Multiverse" src={Eyes} />
        </div>
    )
};

export default Header;