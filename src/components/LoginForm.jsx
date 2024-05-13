import React, { useState,useContext } from 'react';
import { getAllUsers } from '../services/UserService';
import MyContext from '../utils/MyContext';

function LoginForm({ setCurrentUser }) {
    const { cookies,setCookies } = useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you can implement the logic to handle the login process, such as calling an API endpoint
        console.log('Logging in...');
        console.log('Username:', username);
        console.log('Password:', password);
        //TODO: Add logic to check if email attached to username + password entered matches a user on firebase
        //Currently logged in time is only 10 seconds, can set to an hour and refresh cookies anytime user does anything
        //with setCookies
        setCookies('name', username, { maxAge: 3600 });
        console.log(cookies);
        // Reset the form fields after submission
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
