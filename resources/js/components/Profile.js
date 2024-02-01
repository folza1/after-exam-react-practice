import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function Profile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/user')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    console.log(user);

    return (
        <>
            {user && (
                <h2>Üdv kedves {user.name} be vagy lépve!</h2>
            )}
        </>
    );
}

export default Profile;


// if (document.getElementById('example')) {
//     ReactDOM.render(<Register/>, document.getElementById('example'));
// }
