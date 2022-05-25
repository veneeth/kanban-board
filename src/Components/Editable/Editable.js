import React, { useState } from 'react';
import { X } from 'react-feather';

import './Editable.css'

const Editable = (props) => {

    const [showEdit, setShowEdit] = useState(false)
    const [inputValue, setInputValue] = useState(props.text || "")

    return (
        <div className='editable'>
            {showEdit ? 
            (<form className='editable_edit' 
                onSubmit={(event)=>{event.preventDefault();
                if(props.onSubmit){
                    props.onSubmit(inputValue)  
                }  
                setShowEdit(false)
                setInputValue("")
            }}>
                <input type="text" autoFocus
                    value={inputValue}
                    placeholder={props.placeholder || 'Enter Task Name'}
                    onChange={(event)=>setInputValue(event.target.value)}
                />
                <div className='editable_edit_footer'>
                    <button type='submit'>Add</button>
                    <X onClick={()=> setShowEdit(!showEdit)}/>
                </div>
            </form>)
        : (<p className='editable_display' onClick={()=> setShowEdit(!showEdit)}>{props.buttonText || "+ Add Items"}</p>)
        }
        </div>
    );
};

export default Editable;