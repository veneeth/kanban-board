import React, {useState} from 'react';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import DropDown from '../DropDown/DropDown';
import Chip from '../Chip/Chip';
import './Card.css'
import CardInfo from './CardInfo/CardInfo';

const Card = (props) => {

    const card = props.card
    const labels = props.card?.labels

    
    const [showDropdown, setShowdropdown] =useState(false)
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='card' draggable
            onDragEnd={()=>props.handleDragEnd(card?.id, props.bid)}
            onDragEnter={()=>props.handleDragEnter(card?.id, props.bid)}
            onClick={()=> setShowModal(!showModal)}
        >
            {
                showModal ? (<CardInfo 
                                card={card} 
                                onClose={()=> setShowModal(false)}
                                updateCard ={props.updateCard}
                                bid={props.bid}
                                />) : ""
            }
            <div className='card_top'>
                <div className='card_lables'>

                    {
                        labels.map((item, index)=> <Chip key={index} text={item.text} color={item.color}/>)
                    }
                   
                </div>
                <div className='card_top_more'>
                    <MoreHorizontal onClick={()=>setShowdropdown(!showDropdown)}/>
                    {
                        showDropdown ? (
                            <DropDown onClose={()=>setShowdropdown(!showDropdown)}>
                                <div className='board_dropdown'>
                                    <p onClick={()=>props.removeCard(card.id, props.bid)}>Delete Card</p>
                                </div>
                            </DropDown>
                        ) : ""
                    }
                </div>
            </div>

            <div className='card_title'>
                {card.title}
            </div>

            <div className='card_footer'>
               {card.date && <p><Clock />{card.date}</p>} 
                <p><CheckSquare />1/4</p>
            </div>

            
        </div>
    );
};

export default Card;