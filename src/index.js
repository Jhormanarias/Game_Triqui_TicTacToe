//Importar clases de react  -------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// -------------------------------------------

function Square(props){
  return (
    //Cada vez que hago clic en un square el estado se pone en X 
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  ); 
}

class Board extends React.Component {
  //Añado constructor al board para manejar mejor los elementos hijos
  // los elementos hijos son los square
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares: Array(9).fill(null), //----- esto para que me recorra los 9 cuadritos del triqui y value props los ponga null
  //     turno: true
  //   }
  // };

  // handleclick(i){
  //   const squares = this.state.squares.slice();
  //   if(CalcularGanador(squares) || squares[i]){
  //     return;
  //   }
  //   squares[i]= this.state.turno? 'X' : 'O' ;
  //   this.setState({
  //     squares: squares,
  //     turno: !this.state.turno
  //   });
  // }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={()=> this.props.onClick(i)}
      />
    
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  //añadimos constructor para manejar historia de los movimientos
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }] ,
      stepNumber: 0,
      turno: true
    }
  }

  handleclick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(CalcularGanador(squares) || squares[i]){
      return;
    }
    squares[i]= this.state.turno? 'X' : 'O' ;
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      turno: !this.state.turno
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      turno: (step % 2) === 0
    })

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const ganador = CalcularGanador(current.squares);

    const moves = history.map((step,move)=>{
      const desc = move ?
      'Movimiento # ' + move :
      'Vamos a comenzar';
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )

    })
    let status;
    if(ganador){
      status = 'Ganador: '+ganador;
    }
    else{
      status = 'Siguiente jugador: '+(this.state.turno? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleclick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        {/* <div className="titulo">
            <Titulo />
        </div> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <h1>El jueguito del triqui con REACT JS hecho por Jhorman :v</h1>,
  document.getElementById('tittle')
);

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

console.log('http://localhost:3000');



//-----------------Función para calcular un Ganador

function CalcularGanador(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}