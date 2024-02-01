import React from 'react';
import ReactDOM from 'react-dom';
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";

function AppContainer() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppContainer;

if (document.getElementById('example')) {
    ReactDOM.render(<AppContainer/>, document.getElementById('example'));
}
