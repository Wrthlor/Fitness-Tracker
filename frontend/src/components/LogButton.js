import React from 'react';

import DeleteLog from './DeleteLog'

const LogButton = ({ handleClick, logStatus, deleteStatus }) => {

    return (
        <div>
            <button id='create-delete-log' 
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