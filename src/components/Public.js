import React, { useState, useEffect} from 'react';

const Public = () => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch("/public")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else { throw new Error("error with request from server") }
            })
            .then(response => {
                setMessage(response.message);
            })
            .catch(error => {
                setMessage(error.message);
            });
    });

    return (
        <p>
            { message }
        </p>
    );
};

export default Public;