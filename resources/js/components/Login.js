import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";


function Login() {

    const navigate = useNavigate();


    const initialState = {
        email: '',
        password: '',
        error_list: [],
    };

    const [data, setData] = React.useState(initialState);
    const [result, setResult] = React.useState({});

    const nav = useNavigate();

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    console.log(data);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/loginmy', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal.fire({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/profile');
                } else if (res.data.status === 401) {
                    swal.fire({
                        title: "Warning!",
                        text: res.data.message,
                        icon: "warning"
                    });
                } else {
                    setData({...data, error_list: res.data.validation_errors});
                }
            })
        })
    }

    React.useEffect(() => {
        axios.get('/sanctum/csrf-cookie');
        console.log(Cookie.get('XSRF-TOKEN'));
    }, [])

    useEffect(() => {
        const authToken = localStorage.getItem('auth_token');
        if (authToken) {
            navigate('/profile');
        } else {
            // Ha nincs auth_token, irányítsd vissza a felhasználót a bejelentkezési oldalra
            navigate('/loginmy');
        }
    }, []);

    return (
        <>
            <div className="container my-3">
                {result.status === 'error' && <div className={"alert alert-danger"}>{result.message}</div>}
                {result.status === 'success' && <div className={"alert alert-success"}>{result.message}</div>}

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="my-3 mx-auto fw-bold fs-3">Belépés</div>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="g-3">
                                    <div className="row my-3">
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Email:</div>
                                            <input type="email" name="email" className="form-control"
                                                   placeholder="Add meg az email-ed" onChange={handleChange}/>
                                            <span className="text-danger">{data.error_list.email}</span>
                                        </div>
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Jelszó:</div>
                                            <input type="text" name="password" className="form-control"
                                                   placeholder="Add meg a jelszót" onChange={handleChange}/>
                                            <span className="text-danger">{data.error_list.password}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success">Belépés</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

// if (document.getElementById('example')) {
//     ReactDOM.render(<Register/>, document.getElementById('example'));
// }
