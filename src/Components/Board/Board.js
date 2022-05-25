import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/Card';
import DropDown from '../DropDown/DropDown';
import Editable from '../Editable/Editable';
import './Board.css'

const Board = (props) => {
const [showDropdown, setShowdropdown] =useState(false)

const board = props.board;
const cards = props.board?.cards
    return (
        <div className='board'>
            <div className='board_top'>
                <p className='board_top_title'>{board?.title} <span>{`  ${board?.cards?.length}`}</span></p> 
                <div className='board_top_more'>
                    <MoreHorizontal onClick={()=>setShowdropdown(!showDropdown)}/>
                    {
                        showDropdown ? (
                            <DropDown onClose={()=>setShowdropdown(!showDropdown)}>
                                <div className='board_dropdown'>
                                    <p onClick={()=>props.onClick(board.id)}>Delete Board</p>
                                </div>
                            </DropDown>
                        ) : ""
                    }
                </div>
            </div>
            <div className='board_cards'>

                {
                    cards.map((item)=> <Card key={item.id} card={item} 
                        removeCard={props.removeCard} 
                        bid={board.id}
                        handleDragEnd={props.handleDragEnd}
                        handleDragEnter={props.handleDragEnter}
                        updateCard={props.updateCard}
                    />)
                }
                
                <Editable onSubmit={(value)=>props.addCard(value, board.id)}/>
               
            </div>
        </div>
    );
};

export default Board;