import React from 'react';
import ReactDOM from 'react-dom';
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use( function(config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

function AppContainer() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Register/>}/>
                <Route path='/loginmy' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppContainer;

if (document.getElementById('example')) {
    ReactDOM.render(<AppContainer/>, document.getElementById('example'));
}
