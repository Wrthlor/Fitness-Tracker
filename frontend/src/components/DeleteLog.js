import React from 'react';

import Notification from './Notification';

const DeleteLog = ({ deleteButton, handleClick }) => {

    const message = "Deleting log will remove all existing sets.\nAre you sure you want to delete?"; 
    
    return (
        <div>
            <Notification
                message={message}
                className='warning' /> 
            
            <button name='Log' value='yes' onClick={e => {deleteButton(e); handleClick(e) }}>
                Yes
            </button>
            
            <button name='Log' value='no' onClick={e => {deleteButton(e); handleClick(e) }}>
                No
            </button>
        </div>
    )

}

export default DeleteLog;