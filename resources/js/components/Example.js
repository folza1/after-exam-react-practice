import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';
import axios from 'axios';

function Example() {
    const initialState = {
        name: '',
        email: '',
        country: '',
        city: '',
        tel_number: '',
        date_of_birth: '',
        password: '',
        password_confirmation: ''
    };

    const [data, setData] = React.useState(initialState);
    const [result, setResult] = React.useState({});


    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/register', {
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
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <div className="container my-3">
                    {result.status === 'error' && <div className="alert alert-danger">{
                            function(){
                                let tomb=[];
                                for (let kulcs in result.errors) {

                                    if(result.errors[kulcs] && result.errors[kulcs].length>0)
                                        tomb.push(<li key={kulcs}>{result.errors[kulcs]}</li>)
                                }
                                return tomb;
                            }()
                }</div>}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="my-3 mx-auto">Regisztráció</div>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <input type="text" name="name" className="form-control"
                                                   placeholder="Add meg a neved" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <input type="email" name="email" className="form-control"
                                                   placeholder="Add meg az email-ed" onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            {/*<input type="select" name="country" className="form-control"*/}
                                            {/*       placeholder="Add meg a neved"/>*/}
                                            <select name="country" className="form-select" onChange={handleChange}>
                                                <option value="someOption">Some option</option>
                                                <option value="otherOption">Other option</option>
                                            </select>
                                        </div>

                                        <div className="col-6">
                                            <select name="city" className="form-select" onChange={handleChange}>
                                                <option value="someOption">Some option</option>
                                                <option value="otherOption">Other option</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <input type="tel" name="tel_number" className="form-control"
                                                   placeholder="Add meg a telefonszámod" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <input type="date" name="date_of_birth" className="form-control"
                                                   onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <input type="text" name="password" className="form-control"
                                                   placeholder="Add meg a jelszót" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <input type="text" name="password_confirmation" className="form-control"
                                                   placeholder="Add meg a jelszót ismét" onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success">Regisztrálok</button>
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

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
