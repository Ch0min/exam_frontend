import React from 'react';
import {NavLink} from "react-router-dom";
import "../styles/header.css";

import LoggedIn from "./LoggedIn.jsx";
import SignUpBtn from "./SignUpBtn.jsx";
import SignInBtn from "./SignInBtn.jsx";
import userFacade from "../utils/userFacade.js";

function Header(props) {
    return (

        <nav className="topnav">

            <NavLink className="nav-home" to="/"><i className="fa fa-home" style={{fontSize: "20px"}}></i></NavLink>

            {userFacade.hasUserAccess('admin', props.loggedIn) &&
                (<NavLink to="adminpanel"> ADMINSTRATION</NavLink>)}


            {userFacade.hasUserAccess('user', props.loggedIn) &&
                (<NavLink to="myrentalagreements"> MY RENTALS</NavLink>)}




            {!props.loggedIn ? (<SignUpBtn/>) : (<></>)}

            {!props.loggedIn ? (<SignInBtn/>) : (<LoggedIn setLoggedIn={props.setLoggedIn}/>)}

        </nav>
    );
}

export default Header;