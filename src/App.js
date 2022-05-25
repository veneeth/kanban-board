import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import Editable from './Components/Editable/Editable';

function App() {

  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random()*2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "card 1",
          tasks: [],
          labels: [
            {
              
              text: "frontend",
              color: "blue"
            }
          ],
          description: "asdsad",
          date: ""
        },
        {
          id: Date.now() + Math.random(),
          title: "card 2",
          tasks: [],
          labels: [
            {
              text: "frontend",
              color: "blue"
            },
            {
              text: "UX",
              color: "red"
            }
          ],
          description: "assdasd sad",
          date: ""
        }
      ]
    }
  ])

  const [target, setTarget] = useState({
    cid: "",
    bid: ""
  })

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      description: ""
    }

    const index = boards.findIndex(item => item.id === bid)
    if(index < 0) return;

    const tempBoards = [...boards]
    tempBoards[index].cards.push(card)

    setBoards(tempBoards)
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex(item => item.id === bid);
    if(bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(item => item.id === cid);
    if(cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1)

    setBoards(tempBoards)    
  };


  const addBoard = (title)=>{ 

    const board = {
      id: Date.now() + Math.random()*2,
      title,
      cards: []
    }
    const tempBoards = [...boards]
    
    tempBoards.push(board)
    setBoards(tempBoards)   

  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter(item => item.id!==bid);
    setBoards(tempBoards)    
  }


  const handleDragEnter = (cid, bid)=>{
    setTarget({
      cid,
      bid
    })
  }

  const handleDragEnd = (cid,bid)=>{
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex(item => item.id === bid)
    if(s_bIndex<0)return


    s_cIndex = boards[s_bIndex].cards?.findIndex(item => item.id === cid)
    if(s_cIndex<0)return

    t_bIndex = boards.findIndex(item => item.id === target.bid)
    if(t_bIndex<0)return

    t_cIndex = boards[t_bIndex].cards?.findIndex(item => item.id === target.cid)
    if(t_cIndex<0)return 

    const tempboards = [...boards]
    const tempCard = tempboards[s_bIndex].cards[s_cIndex]

    tempboards[s_bIndex].cards.splice(s_cIndex, 1);
    tempboards[t_bIndex].cards.splice(t_cIndex,0, tempCard)


    setBoards(tempboards)
    

  }

  const updateCard = (cid,bid,card) => {
    const bIndex = boards.findIndex(item => item.id === bid);
    if(bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(item => item.id === cid);
    if(cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card 
    setBoards(tempBoards);
  }

  return (
    <div className="app">
      <div className='app_navbar'>
        <h2>Kanban</h2>
      </div>
      <div className='app_outer'>
        <div className='app_boards'>
          {
            boards.map((item)=> {
              return <Board 
              key={item.id} board={item} 
              onClick={(id)=>removeBoard(id)}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
            })
          }
          
          <div className='app_boards_board'>
          <Editable 
            buttonText="Add Board"
            placeholder="Enter Board title"  
            onSubmit={(value) => 
               (addBoard(value))
             }
          />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
