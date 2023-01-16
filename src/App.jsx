import React, {useEffect, useState} from 'react'
import {Route, Routes} from "react-router";
import "./styles/styles.css";

import loginFacade from "./utils/loginFacade.js";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (loginFacade.getToken()) setLoggedIn(true);
    }, []);

    return (
        <div className="main">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="signin" element={!loggedIn ? <SignIn setLoggedIn={setLoggedIn} /> : <Home loggedIn={loggedIn} />}/>
                <Route path="signup" element={<SignUp />}/>

                <Route path="*" element={<h1>Page Not Found!!!</h1>}/>


            </Routes>

        </div>
    )
}

export default App
