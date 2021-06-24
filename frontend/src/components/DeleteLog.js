import React from 'react';

import Notification from './Notification';

const DeleteLog = ({ handleClick }) => {

    const message = "Deleting log will remove all existing sets.\nAre you sure you want to delete?"; 
    
    return (
        <div>
            <Notification
                message={message}
                className='warning' /> 
            
            <button id='confirm-delete-yes' name='confirmDelete' value='yes' onClick={handleClick}>
                Yes
            </button>
            
            <button id='confirm-delete-no' name='confirmDelete' value='no' onClick={handleClick}>
                No
            </button>
        </div>
    )

}

export default DeleteLog;