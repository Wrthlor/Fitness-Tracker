import React from 'react';

const LoginForm = ({ 
    handleLogin, 
    username, 
    password, 
    handleChange 
}) => {

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
            </form>
        </div>
    )
}

export default LoginForm;