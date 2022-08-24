import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_TUTOR } from '../../utils/mutations'

function TutorSignup(props) {
    const [formState, setFormState] = useState({ tutorname: '', email: '', password: '' });
    const [addTutor] = useMutation(ADD_TUTOR);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addTutor({
            variables: {
                tutorname: formState.tutorname,
                email: formState.email,
                password: formState.password,
            },
        });
        const token = mutationResponse.data.addTutor.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div>
        <Link to="/tutorLogin">Go to Login</Link>

        <h2>Tutor Signup</h2>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="tutorname">Tutor's username:</label>
                <input
                    placeholder="Tutor's Username"
                    name="tutorname"
                    type="tutorname"
                    id="tutorname"
                    onChange={handleChange}
                />
                </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    placeholder="Your Email"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="pwd">Password:</label>
                <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    );
}

export default TutorSignup;