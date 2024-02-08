import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        const authToken = localStorage.getItem('auth_token');
        if (authToken) {
            axios.get('/api/user', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            // Ha nincs auth_token, irányítsd vissza a felhasználót a bejelentkezési oldalra
            navigate('/loginmy');
        }
    }, []);


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
                navigate('/loginmy');
            }
        })
    }

    return (
        <>
            <h2>Üdv kedves {user.name} Be vagy lépve!</h2>
            <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger">Kijelentkezés</button>
        </>
    );
}

export default Profile;
