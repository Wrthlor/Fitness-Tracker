import React from 'react';

const SignUp = ({ 
    handleSignUp,
    handleChange,
    name2,
    username,
    password,
    confirmPassword 
}) => {

    return (
        <div>
            <div>
                <h2>Sign up</h2>

                <button name='cancel' onClick={handleSignUp}>
                    Cancel
                </button>
            </div>

            <form name='signup' onSubmit={handleSignUp}>

                <div>
                    Name { }
                    <input 
                        type='text'
                        value={name2}
                        maxLength='100'
                        onChange={handleChange} />
                </div>

                <div>
                    Username { }
                    <input 
                        type='text'
                        name='username'
                        value={username}
                        maxLength='100'
                        onChange={handleChange} />
                </div>
                <div>
                    Password { }
                    <input 
                        type='password'
                        name='password'
                        value={password}
                        maxLength='100'
                        onChange={handleChange} />
                </div>

                <div>
                    Confirm Password { }
                    <input 
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange} />
                </div>

                <button type='submit'>
                    Create
                </button>
            </form>
        </div>
    )

}

export default SignUp;