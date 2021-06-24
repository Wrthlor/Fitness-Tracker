import React from 'react';

const LoginForm = ({ 
    handleLogin, 
    username, 
    password, 
    handleChange 
}) => {

    return (
        <div>
            <h2 id='login-title'>Sign In</h2>

            <form name='login' onSubmit={handleLogin}>
                <div id='login-form'>
                    <div>
                        Username { }
                        <input 
                            id='login-user'
                            type="text"
                            value={username}
                            onChange={handleChange} />
                    </div>

                    <div>
                        Password { }
                        <input 
                            id='login-pass'
                            type="password"
                            value={password}
                            onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <button id='login-button' type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;