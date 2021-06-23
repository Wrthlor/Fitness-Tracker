import React, { useEffect, useState, useRef } from 'react';

import usersServices from '../services/usersServices';

const SignUp = ({ 
    usersList,
    setSignup,
    setMessage
}) => {

    const [newUser, setNewUser ] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    const [highlight, setHighlight ] = useState({
        user: 'username-highlight',
        pass: 'password-highlight'
    });
    const [errorNotif, setErrorNotif ] = useState({
        user: '',
        pass: ''
    });
    const idRef = useRef();


    // Manages new user creation
    const usernameRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    const handleNewUser = (event) => {
        event.preventDefault();

        if (event.target.name ==='signup') { 
            
            // Checks username meets criteria
            if (!usernameRegex.test(newUser.username)) {
                setHighlight({
                    ...highlight,
                    user: 'error-username-highlight'
                });
                const id = setTimeout(() => {
                    setHighlight({
                        user: 'username-highlight',
                        pass: 'password-highlight'
                    })
                }, 5000);
                idRef.current = id;
            }
            // Checks for existing usernames
            else if (usersList.map(user => user.username).includes(newUser.username)) {
                setErrorNotif({
                    ...errorNotif,
                    user: 'Username already exists',
                })
                const id = setTimeout(() => {
                    setErrorNotif({
                        user: '',
                        pass: ''
                    });
                }, 5000);
                idRef.current = id;
            }
            // Checks password meets alphanumeric req
            else if (newUser.password.length < 8 || !passwordRegex.test(newUser.password)) {
                setHighlight({
                    ...highlight,
                    pass: 'error-password-highlight'
                });
                const id = setTimeout(() => {
                    setHighlight({
                        user: 'username-highlight',
                        pass: 'password-highlight'
                    })
                }, 5000);
                idRef.current = id;
            }
            // Checks if confirmed/passwords match
            else if (newUser.password !== newUser.confirmPassword) {
                setErrorNotif({
                    ...errorNotif,
                    pass: 'Passwords do not match',
                })
                const id = setTimeout(() => {
                    setErrorNotif({
                        user: '',
                        pass: ''
                    });
                }, 5000); 
                idRef.current = id;
            }
            // Meets critera to create new user
            else {                     
                usersServices.createUser({
                    ...newUser,
                    name: newUser.name.trim()
                });
                setNewUser({
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                }); 
                setMessage({
                    message: 'User created',
                    type: 'success'
                });
                const id = setTimeout(() => {
                    setMessage({
                        message: '',
                        type: ''
                    });
                }, 5000);
                idRef.current = id;
                setSignup(false);
            }
        }
        // Cancel sign-up
        else {
            setNewUser({
                name: '',
                username: '',
                password: '',
                confirmPassword: '',
            })
            setSignup(false);
        }
    }

    const handleChange = (event) => {
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

    // Clear timeoutId
    useEffect(() => {
        const timeoutId = idRef.current;
        return () => {
            clearTimeout(timeoutId);
        };
    });

    return (
        <div>
            <div>
                <h2>Sign up</h2>

                <button name='cancel' onClick={handleNewUser}>
                    Cancel
                </button>
            </div>

            <form name='signup' onSubmit={handleNewUser}>
                <div>
                    Name { }
                    <input 
                        type='text'
                        value={newUser.name}
                        maxLength='100'
                        onChange={handleChange} />
                </div>

                <div>
                    Username { }
                    <input 
                        type='text'
                        name='username'
                        value={newUser.username}
                        maxLength='100'
                        onChange={handleChange} />

                    <p id='error-username-highlight'>{errorNotif.user}</p>
                    <p id={highlight.user}>Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen</p>
                </div>

                <div>
                    Password { }
                    <input 
                        type='password'
                        name='password'
                        value={newUser.password}
                        maxLength='100'
                        onChange={handleChange} />
                </div>

                <div>
                    Confirm Password { }
                    <input 
                        type='password'
                        name='confirmPassword'
                        value={newUser.confirmPassword}
                        maxLength='100'
                        onChange={handleChange} />

                    <p id='error-password-highlight'>{errorNotif.pass}</p>
                    <p id={highlight.pass}>Passwords may only contain alphanumeric characters and must be greater than 8 characters</p>
                </div>
                
                <button type='submit'>
                    Create
                </button>
            </form>
        </div>
    )

}

export default SignUp;