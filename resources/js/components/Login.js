import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';
import {useNavigate} from "react-router-dom";

function Login() {
    const initialState = {
        email: '',
        password: '',
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
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-Token': Cookie.get('XSRF-TOKEN'),
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
            return res.json();
        })
            .then(res => {
                setResult(res);
                if (res.status === 'success') {
                    window.alert('Sikeres bejelentkezés!');
                    nav('/profile');
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    React.useEffect(() => {
        axios.get('/sanctum/csrf-cookie');
        console.log(Cookie.get('XSRF-TOKEN'));
    }, [])

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
                                        </div>
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Jelszó:</div>
                                            <input type="text" name="password" className="form-control"
                                                   placeholder="Add meg a jelszót" onChange={handleChange}/>
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
