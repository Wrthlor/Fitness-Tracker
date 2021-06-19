import React from 'react';

const SignUp = ({ handleLogin }) => {


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>Name</div>
                <div>Username</div>
                <div>Password</div>
                <div>Confirm Password</div>
            </form>
        </div>
    )

}

export default SignUp;