import React from 'react';

/*
    name - Default value = "" - name attribute for element
    className - Default vale = "" - class name(s) added to main <div> element
    hidden - Default value = false - specifies placehodler option should be hidden
    disabled - Default value = false - specifies placeholder option should be disabled
    list - Default value = [] - array of options, must have id and name
    placeholder - Default value = "" - default text, disabled and hidden from dropdown
    onChange - event handler function for selecting item
*/
const Dropdown = ({ 
    name = "", 
    className = "",
    hidden = false, 
    disabled = false, 
    list = [],  
    placeholder = "", 
    onChange 
}) => {

    return (
        <div className={className}>
            <select name={name} defaultValue={placeholder} onChange={onChange }>
                <option hidden={hidden} disabled={disabled} value={placeholder} >
                    {placeholder}
                </option>
                {list.map(element => 
                    <option key={element.id} value={element.name}>
                        {element.name}
                    </option>) 
                }
            </select>
        </div>
    );
};

export default Dropdown;