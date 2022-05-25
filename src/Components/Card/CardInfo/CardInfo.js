import React, { useEffect, useState } from 'react';
import { Calendar, List, Tag, Type } from 'react-feather';
import Chip from '../../Chip/Chip';
import Editable from '../../Editable/Editable';
import Modal from '../../Modal/Modal';

import './CardInfo.css'

const CardInfo = ({card,onClose, bid, updateCard}) => {

    const colors = [
        "red",
        "green",
        "blue",
        "grey",
        "orange",
        "yellow"
    ]

    const [activeColor, setActiveColor] = useState("")

    const [values, setValues] = useState({
        ...card
    })

    const addLabel = (value,color) => {
        const index = values.labels?.findIndex(item => item.text === value);
        if(index > -1)return ;
        const label = {
            text: value,
            color
        }

        setValues({
            ...values, labels: [...values.labels, label]
        })
    }

    const removeLabel = (text) => {
        const tempLabels = values.labels?.filter(item => item.text !== text)

     setValues({
            ...values, labels: tempLabels
        })
    }

    useEffect(()=>{
        updateCard(card.id, bid, values)
    },[values])

    console.log(values.date)

    return (
       
            <Modal onClose={()=> onClose() }>
                <div className='cardinfo'>
                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Type />
                            Title
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable text={values.title || ""} placeholder={"Enter Title"} buttonText={values.title || "Rename Title"}
                                onSubmit={(value)=> setValues({...values, title: value})}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <List />
                            Description
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable text={values.description || ""} placeholder={"Enter Description"} buttonText={values.description ||"Set Description"}
                                onSubmit={(value)=> setValues({...values, description: value})}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Calendar />
                            Date
                        </div>
                        <div className='cardinfo_box_body'>
                            <input type="date" 
                            
                                defaultValue={values.date ? JSON.stringify(new Date(values.date)).slice(0,11) : ""}
                                onChange={(e)=> {
                                    const dateObj = new Date(e.target.value) 
                                    setValues({...values, date: dateObj.toLocaleDateString("en-US")})}
                                }
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Tag />
                            Labels
                        </div>
                        <div className='cardinfo_box_labels'>
                            {
                                values.labels.map((item,index)=> (
                                    <Chip 
                                    
                                        key={item.text+index} close 
                                        onClose={()=> removeLabel(item.text) }
                                        text={item.text} color={item.color}
                                    />
                                ))
                            }
                        </div>
                        <div className='cardinfo_box_colors'>
                            
                            {
                                colors.map((item, index)=> (
                                    <li key={index} style={{backgroundColor: item}} 
                                        className={item===activeColor ? "active": ""}
                                        onClick={()=>setActiveColor(item)}
                                    />  
                                ))
                            }
                        </div>
                        <div className='cardinfo_box_body'>

                            <Editable  placeholder={"Enter Label"} buttonText={"Add Label"} 
                                onSubmit={(value)=> addLabel(value, activeColor)}
                            />
                        </div>
                    </div>
                </div>
                
            </Modal>
        
    );
};

export default CardInfo;