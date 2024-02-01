import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Profile() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Olvassuk ki az 'access_token' nevű cookie értékét
                const storedToken = Cookies.get('access_token');

                if (storedToken) {
                    // Küldj egy GET kérést az /api/user végpontra a tárolt tokennel
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`, // Helyettesítsd a tokent a sajátoddal
                        },
                    });

                    // Frissítsd az állapotot a válaszból kapott felhasználói adatokkal
                    setUser(response.data);
                } else {
                    setError('Token cookie not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };

        // Hívd meg a függvényt
        fetchUserData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {user && (
                <h2>Üdv kedves {user.name} be vagy lépve!</h2>
            )}
        </>
    );
}

export default Profile;
