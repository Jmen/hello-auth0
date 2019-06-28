import React, { useState, useEffect } from 'react';

const Private = ({ auth }) => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch("/private", { headers : { Authorization : `Bearer ${auth.getAccessToken()}` } })
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

export default Private;