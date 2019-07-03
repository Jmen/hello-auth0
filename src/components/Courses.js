import React, { useState, useEffect } from 'react';

const Courses = ({ auth }) => {

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/courses", { headers : { Authorization : `Bearer ${auth.getAccessToken()}` } })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else { throw new Error("error with request from server") }
            })
            .then(response => {
                setCourses(response.courses);
            })
            .catch(error => {
                setError(error.message);
            });
    });

    return(
        <ul>
            {courses.map((course) => {
                return <li key={course.id}> {course.title} </li>
            })}
        </ul>
    );
};

export default Courses;