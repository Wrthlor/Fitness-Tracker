import React, { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import FitnessTracker from './components/FitnessTracker';

import logsService from './services/logsService';
import usersServices from './services/usersServices';

const App = () => {

    const [user, setUser ] = useState(null);
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    
    const [message, setMessage ] = useState({
        message: '',
        className: ''
    });

    // Checks for logged-in user
    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser');
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson);
            setUser(user);
            logsService.setToken(user.token);
        }
    }, []);

    // Manages when user tries to login and logout
    const handleLogin = async (event) => {
        event.preventDefault();

        if (event.target.name === 'login') {
            try {
                const user = await usersServices.login({
                    username, password
                });

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )
                logsService.setToken(user.token);
                setUser(user);
                setUsername('');
                setPassword('');
                
                setMessage({
                    message: 'Successfully logged in',
                    type: 'success'
                });
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
            catch (exception) {
                setMessage({
                    message: ' Invalid Username or Password',
                    type: 'failure'
                });
                setTimeout(() => {
                    setMessage('')
                }, 5000);
            }
        }
        else {
            window.localStorage.clear();
            setUser(null);
            setUsername('');
            setPassword('');
            
            setMessage({
                message: 'Successfully logged out',
                type: "success"
            });
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
    }

    const handleChange = (event) => {
        event.preventDefault();

        if (event.target.type === 'password') 
            setPassword(event.target.value);
        else 
            setUsername(event.target.value);
    }

    return (
        <div id='app'>

            {message.message !== '' && 
                <Notification
                    message={message.message}
                    className={message.type} /> }

            {user === null 
                ? ( 
                    <div>
                        <LoginForm 
                            handleLogin={handleLogin} 
                            user={user}
                            username={username} 
                            password={password} 
                            handleChange={handleChange} 
                        />
                        <button>
                            Sign Up
                        </button>
                    </div> )
                : (
                    <div>
                        <div id='logged-in'>
                            <div>Logged in as <b><i>{user.username}</i></b></div>
                            <button onClick={handleLogin} >
                                Log out
                            </button>
                        </div>
                        
                        <FitnessTracker />
                    </div> )}
        </div>
    );
};

export default App;
