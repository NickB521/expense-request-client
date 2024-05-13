import React, { useState } from 'react';
import { createUser } from '../services/UserService';
import signUpFireBase from '../utils/signUpFireBase';
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('Signing up...');
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        const fireBaseUser = await signUpFireBase(email, password);
        //TODO:need to add check if username
        if(fireBaseUser){ 
            createUser({ name: username, admin: false,uid: fireBaseUser.uid})
        }
        // Reset the form fields after submission
        setEmail('');
        setUsername('');
        setPassword('');

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;