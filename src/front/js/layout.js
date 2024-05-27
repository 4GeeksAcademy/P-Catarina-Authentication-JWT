import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Welcome } from "./pages/welcome";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Card } from "./component/card";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Welcome />} path="/welcome" />
                        <Route element={<Card text="Looks like you're lost, might wanna go back..." />} path="/*" />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
