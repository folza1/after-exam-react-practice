import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';

function Register() {
    const initialState = {
        name: '',
        email: '',
        country: '',
        city: '',
        tel_number: '',
        date_of_birth: '',
        password: '',
        password_confirmation: '',
        sex: '',
        accept_terms: '',
    };

    const [data, setData] = React.useState(initialState);
    const [result, setResult] = React.useState({});
    const [countries, setCountries] = React.useState([]);
    const [cities, setCities] = React.useState([]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        // Frissítsd az adatobjektumot
        setData({ ...data, [name]: value });

        // Ha az ország változik, küldd el a back-end-nek a városok lekéréséhez
        if (name === 'country') {
            // Küldj egy API kérést a városok lekérdezéséhez a kiválasztott ország alapján
            fetch(`/api/cities/${value}`)
                .then(response => response.json())
                .then(cities => {
                    // Frissítsd a városok állapotát a kapott adatokkal
                    setCities(cities);
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    }


    console.log(data);
    console.log(cities);

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

    React.useEffect(() => {
        fetch('/api/countries')
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    React.useEffect(() => {
        axios.get('/sanctum/csrf-cookie');
        console.log(Cookie.get('XSRF-TOKEN'));
    },[])

    return (
        <>
            <div className="container my-3">
                {result.status === 'error' && <div className="alert alert-danger">{
                    function () {
                        let tomb = [];
                        for (let kulcs in result.errors) {

                            if (result.errors[kulcs] && result.errors[kulcs].length > 0)
                                tomb.push(<li key={kulcs}>{result.errors[kulcs]}</li>)
                        }
                        return tomb;
                    }()
                }</div>}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="my-3 mx-auto fw-bold fs-3">Regisztráció</div>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="g-3">
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Neved:</div>
                                            <input type="text" name="name" className="form-control"
                                                   placeholder="Add meg a neved" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Email:</div>
                                            <input type="email" name="email" className="form-control"
                                                   placeholder="Add meg az email-ed" onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            {/*<input type="select" name="country" className="form-control"*/}
                                            {/*       placeholder="Add meg a neved"/>*/}
                                            <div className="fw-bold fs-5">Ország:</div>
                                            <select name="country" className="form-select" onChange={handleChange}>
                                                <option value="">Válassz országot</option>
                                                {countries.map((country, index) => {
                                                        return <option value={country.id}
                                                                       key={index}>{country.name}</option>
                                                    }
                                                )}
                                                {/*<option value="someOption">Some option</option>*/}
                                                {/*<option value="otherOption">Other option</option>*/}
                                            </select>
                                        </div>

                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Város:</div>
                                            <input list="cities" name="city" className="form-control"
                                                   onChange={handleChange} placeholder="Válaszd ki a várost..."/>
                                            <datalist id="cities">
                                                {cities.map((city, index) => (
                                                    <option value={city.name} key={index}/>
                                                ))}
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Telefonszámod:</div>
                                            <input type="tel" name="tel_number" className="form-control"
                                                   placeholder="Add meg a telefonszámod" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Születési idő:</div>
                                            <input type="date" name="date_of_birth" className="form-control"
                                                   onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Jelszó:</div>
                                            <input type="text" name="password" className="form-control"
                                                   placeholder="Add meg a jelszót" onChange={handleChange}/>
                                        </div>

                                        <div className="col-6">
                                            <div className="fw-bold fs-5">Jelszó ismét:</div>

                                            <input type="text" name="password_confirmation" className="form-control"
                                                   placeholder="Add meg a jelszót ismét" onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="fw-bold fs-5">Nemed:</div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sex"
                                                   id="male" value="male" onChange={handleChange}/>
                                            <label className="form-check-label" htmlFor="male">
                                                Férfi
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sex"
                                                   id="female" value="female" onChange={handleChange}/>
                                            <label className="form-check-label" htmlFor="female">
                                                Nő
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="sex"
                                                   id="other" value="other" onChange={handleChange}/>
                                            <label className="form-check-label" htmlFor="other">
                                                Egyéb
                                            </label>
                                        </div>
                                    </div>

                                    <div className="my-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="1"
                                                   id="accept_terms" name="accept_terms" onChange={handleChange}/>
                                            <label className="form-check-label" htmlFor="accept_terms">
                                                A felhasználási feltételeket elfogadom
                                            </label>
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

export default Register;

// if (document.getElementById('example')) {
//     ReactDOM.render(<Register/>, document.getElementById('example'));
// }