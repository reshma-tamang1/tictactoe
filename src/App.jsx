import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'
import './App.css'

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const result = calculateWinner(squares);
  const winner = result?.player??null;
  const isDraw = !winner && squares.every(Boolean);
  const winLine = result?.line??[]
  var status;
  if(winner){
    status="Winner is:"+winner;
  }else if(isDraw){
    status ="Game is Draw"
  }
  else{
    status="Next player: "+(xIsNext?"X":"O");
  }
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)?.player) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";

    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

  }

  function calculateWinner(squares) {
    const WIN_LINES  = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < WIN_LINES .length; i++) {
    const [a, b, c] = WIN_LINES [i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {player:squares[a],line:[a,b,c]};
    }
  }
    return null;
  
  }

 function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function Square({ value, onSquareClick,isWinner,disabled }) {
    return (<button className={`square${isWinner?" winner":""}`} onClick={onSquareClick} disabled={disabled} >{value ? (
        <span className={`mark ${value === "X" ? "mark-x" : "mark-o"}`}>
          {value}
        </span>
      ) : null}
      </button>);
  }

  const indices = Array.from({ length: 9 }, (_, i) => i);
  const {width,height} = useWindowSize()

  return (
    <>
    {winner && <Confetti width={ width} height={height} numberOfPieces={5000} recycle={false} />}
    <div className='status'>{status}</div>

    {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {indices.slice(row * 3, row * 3 + 3).map((i) => (
            <Square
              key={i}
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              isWinner={winLine.includes(i)}
              disabled={Boolean(winner)}
            />
          ))}
        </div>
      ))}

       <button className="reset" onClick={reset} style={{ marginTop: 12 }}>
        Reset
      </button>
    </>
  )
}

export default Board
