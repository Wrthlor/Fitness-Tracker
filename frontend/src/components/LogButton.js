import React from 'react';

import DeleteLog from './DeleteLog'

const LogButton = ({ handleClick, logStatus, deleteStatus }) => {

    return (
        <div>
            <button className='create-delete-button' 
                    name={logStatus ? 'deleteLog' : 'createLog' } 
                    onClick={handleClick}
            >
                {logStatus ? 'Delete Log' : 'Create Log'}
            </button>

            {deleteStatus && 
                <DeleteLog 
                    handleClick={handleClick} />
            }
        </div>
    )

}

export default LogButton;