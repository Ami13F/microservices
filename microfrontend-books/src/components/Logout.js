import React, { useState, useEffect } from "react";
import "../styles/Logout.css"

const handleLogout = (navigate, e) => {
    e.preventDefault();
    console.log("logout")
    console.log(navigate)
    localStorage.setItem("token", null)
    navigate("/auth")
}

class Logout extends React.Component {
    render() {
        return (
            <div class="navigation" onClick={(e) => { handleLogout(this.props.navigate, e) }}>                
               LOGOUT
            </div>

        );
    }
}
export default Logout;