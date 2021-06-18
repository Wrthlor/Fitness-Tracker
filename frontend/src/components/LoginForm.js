import React/*, { userState, useState }*/ from 'react';

// import usersServices from '../services/usersServices';
// import logsService from '../services/logsService';
// import Notification from './Notification';

const LoginForm = ({ handleLogin, username, password, handleChange }) => {

    // const [user, setUser] = useState(null);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');

    // const handleChange = (event) => {
    //     event.preventDefault();

    //     if (event.target.type === 'password') {
    //         setPassword(event.target.value);
    //     } 
    //     else {
    //         setUsername(event.target.value);
    //     }
    // }

    return (
        <div>
            <h2>Login</h2>

            <form name='login' onSubmit={handleLogin}>
                <div>
                    Username { }
                    <input 
                        type="text"
                        value={username}
                        onChange={handleChange} />
                </div>

                <div>
                    Password { }
                    <input 
                        type="password"
                        value={password}
                        onChange={handleChange} />
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>

                {/* {message !== '' && 
                    <Notification
                        message={message}
                        className='warning' />
                } */}
            </form>
        </div>
    )
}

export default LoginForm;