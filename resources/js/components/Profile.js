import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function Profile() {

    const navigate = useNavigate();


    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logoutmy').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal.fire({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success"
                });
                navigate('/');
            }
        })
    }

    return (
        <>
            <h2>Üdv kedves! Be vagy lépve!</h2>
            <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger">Kijelentkezés</button>
        </>
    );
}

export default Profile;
