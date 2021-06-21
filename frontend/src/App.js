import React, { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import Notification from './components/Notification';
import FitnessTracker from './components/FitnessTracker';

import logsService from './services/logsService';
import usersServices from './services/usersServices';

const App = () => {

    const [user, setUser ] = useState(null);
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    const [usersList, setUsersList ] = useState([]);
    const [signup, setSignup ] = useState(false);
    const [newUser, setNewUser ] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [message, setMessage ] = useState({
        message: '',
        type: ''
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

    // Gets array of existing users
    useEffect(() => {
        usersServices
            .getUsers()
            .then(users => setUsersList(users))
            .catch(error => console.log(error));
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

    // Manages new user creation
    const usernameRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    const handleSignUp = (event) => {
        event.preventDefault();

        switch (event.target.name) {
            case 'signup': 
                // Checks if name meets criteria
                if (!usernameRegex.test(newUser.name)) {
                    setMessage({
                        message: 'Name may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                } 
                // Checks username meets criteria
                else if (!usernameRegex.test(newUser.username)) {
                    setMessage({
                        message: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
                // Checks for existing usernames
                else if (usersList.map(user => user.username).includes(newUser.username)) {
                    setMessage({
                        message: 'Username already exists',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
                // Checks password meets criteria
                else if (newUser.password.length < 8 || !passwordRegex.test(newUser.password)) {
                    setMessage({
                        message: 'Passwords may only contain alphanumeric characters and must be greater than 8 characters',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
                // Checks if confirmed/passwords match
                else if (newUser.password !== newUser.confirmPassword) {
                    setMessage({
                        message: 'Passwords do not match',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        setMessage('')
                    }, 5000);
                }
                // Meets critera to create new user
                else {                    
                    usersServices.createUser(newUser)
                    setNewUser({
                        name: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                    })
                    setSignup(false);

                }
                break;
            
            case 'cancel':
                setNewUser({
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                })
                setSignup(false);
                break;

            default:
                setUsername('');
                setPassword('');
                setSignup(true);
                break;
        }
    }

    const handleChange2 = (event) => {
        event.preventDefault();

        switch (event.target.name) {
            case 'username': 
                setNewUser({
                    ...newUser,
                    username: event.target.value
                })
                break;

            case 'password': 
                setNewUser({
                    ...newUser,
                    password: event.target.value
                })
                break;

            case 'confirmPassword':
                setNewUser({
                    ...newUser,
                    confirmPassword: event.target.value
                })
                break;

            default: 
                setNewUser({
                    ...newUser,
                    name: event.target.value
                })
                break;
        }
    }

    return (
        <div id='app'>

            {message.message !== '' && 
                <Notification
                    message={message.message}
                    className={message.type} /> }

            {user === null 
                ? ( 
                    signup === false 
                    ? (
                        <div>
                            <LoginForm 
                                handleLogin={handleLogin} 
                                user={user}
                                username={username} 
                                password={password} 
                                handleChange={handleChange} 
                            />

                            <button onClick={handleSignUp}>
                                Sign Up
                            </button>
                        </div> )
                    : <SignUp 
                        handleSignUp={handleSignUp}
                        name2={newUser.name}
                        username={newUser.user}
                        password={newUser.password}
                        confirmPassword={newUser.confirmPassword}
                        handleChange={handleChange2} /> )
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
