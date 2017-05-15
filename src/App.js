import React, { Component } from 'react';
import './App.css';

var NODE_TYPES = 6
var ROW_NUMBER = 9;
var NEW_NODE_NUMBER = 3;

class App extends Component {    
  constructor() {
    super();

    this.state = {
      squares: this.initSquares(),
      nextSquares: this.getNextSquares(true),
      playing: false
    };
  }

  startGame() {
    let squares = this.initSquares();
    this.addNewNodes(squares);
    let nextSquares = this.getNextSquares(false);
    this.setState({
      squares: squares,
      nextSquares: nextSquares,
      playing: true
    });
  }

  initSquares() {
    let squares = new Array(ROW_NUMBER * ROW_NUMBER);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = {
        x: i % ROW_NUMBER,
        y: Math.floor(i / ROW_NUMBER),
        filled: false,
        type: null
      }
    }
    
    return squares;
  }

  addNewNodes(squares) {
    let nextSquares = this.getNextSquares(false);
    for (let i = 0; i < nextSquares.length; i++) {
      var nextNodeIndex = Math.floor(Math.random() * ROW_NUMBER * ROW_NUMBER);
      do {
        if (!squares[nextNodeIndex].filled) {
          squares[nextNodeIndex].filled = true;
          squares[nextNodeIndex].type = nextSquares[i].type;
          break;
        } else {
          nextNodeIndex++;
          if (nextNodeIndex >= ROW_NUMBER * ROW_NUMBER) {
            nextNodeIndex = 0;
          }
        }
      } while (!squares[nextNodeIndex].filled)
    }
  }

  getNextSquares(init) {
    let result = [];
    for (let i = 0; i < NEW_NODE_NUMBER; i++) {
      result.push({
        filled: init ? false : true,
        type: init ? null : Math.floor(Math.random() * NODE_TYPES + 1)
      });
    }
    return result;
  }

  onSquareClicked(evt){

  }

  render() {
    return (
      <div className="app">
        <InformationPanel startButtonText={this.state.playing ? "Restart Game" : "Start Game"} 
                          onStartButtonClick={() => this.startGame()} />
        <Board squares={this.state.squares} onSquareClicked={(evt) => this.onSquareClicked(evt)}/>
        <StatusPanel nextSquares={this.state.nextSquares}/>
      </div>
    );
  }
}

class Board extends Component {
  renderSquares(){     
    let rows = [];
    let oneRow = [];
    let rowKey = 0;
    for (let i=0; i<this.props.squares.length; i++){      
      let node = this.props.squares[i];
      if (node.x === 0){
        if (oneRow.length > 0){
          rows.push(<div className="board-row" key={rowKey++}>{oneRow}</div>);
          oneRow = [];          
        }
      }

      oneRow.push(<Square value={node} key={node.x} onClick={(evt) => this.props.onSquareClicked(evt)}/>)          
    };

    rows.push(<div className="board-row" key={rowKey}>{oneRow}</div>)
    return rows;
  }

  render() {
    return (      
      <div className="board">
        {this.renderSquares()}
      </div>
    );
  }
}

class Square extends Component {
  render() {
    let classNames = ["square"];
    if (!this.props.value){
      console.log("fail");      
    }

    if (this.props.value.filled){
      classNames.push("filled");
    }

    if (this.props.value.type){
      classNames.push("type-" + this.props.value.type);
    }

    return <div className={classNames.join(' ')} />
  }
}

class StatusPanel extends Component {
  render() {
    return (
      <div className="status-panel" >
        <Score />
        <div className="next-square">
          <span className="next-label">Next</span>
          {this.props.nextSquares.map((node, index) => {
            return <Square key={index} value={node} />;
          })}
        </div>
        <div className="clear" />
      </div>
    );
  }
}

class Score extends Component {
  render() {
    return (
      <div className="score">
        <span className="score-label">Score: </span>
        <span className="score-value">0</span>
      </div>
    );
  }
}

class InformationPanel extends Component {
  render() {
    return (
      <div className="info-panel">
        <span>Welcome!</span>
        <button className="start-button" onClick={this.props.onStartButtonClick}>{this.props.startButtonText}</button>
      </div>);
  }
}


export default App;

function findPath(squareMap, start, end) {
  if (!squareMap || squareMap.length !== ROW_NUMBER * ROW_NUMBER || !start || !end) {
    return null;
  }

  let currentNode = null;
  var mapArray = squareMap.map((node, index) => {
    let output = {
      x: node.x,
      y: node.y,
      filled: node.filled,
      visited: false,
      distance: Infinity,
      prev: null,
    };

    if (start.x === node.x && start.y === node.y) {
      currentNode = output;
      currentNode.distance = 0;
    }

    return output;
  });

  if (!currentNode) {
    return null;
  }

  let hasMore = true;
  while (hasMore) {
    currentNode.visited = true;
    if (currentNode.x === end.x && currentNode.y === end.y) {
      break;
    }

    if (currentNode.x > 0 &&
      !mapArray[currentNode.y][currentNode.x - 1].filled &&
      mapArray[currentNode.y][currentNode.x - 1].distance > currentNode.distance + 1) {
      mapArray[currentNode.y][currentNode.x - 1].distance = currentNode.distance + 1;
      mapArray[currentNode.y][currentNode.x - 1].prev = currentNode;
    }

    if (currentNode.x < ROW_NUMBER &&
      !mapArray[currentNode.y][currentNode.x + 1].filled &&
      mapArray[currentNode.y][currentNode.x + 1].distance > currentNode.distance + 1) {
      mapArray[currentNode.y][currentNode.x + 1].distance = currentNode.distance + 1;
      mapArray[currentNode.y][currentNode.x + 1].prev = currentNode;
    }

    if (currentNode.y > 0 &&
      !mapArray[currentNode.y - 1][currentNode.x].filled &&
      mapArray[currentNode.y - 1][currentNode.x].distance > currentNode.distance + 1) {
      mapArray[currentNode.y - 1][currentNode.x].distance = currentNode.distance + 1;
      mapArray[currentNode.y - 1][currentNode.x].prev = currentNode;
    }

    if (currentNode.y < ROW_NUMBER &&
      !mapArray[currentNode.y + 1][currentNode.x].filled &&
      mapArray[currentNode.y + 1][currentNode.x].distance > currentNode.distance + 1) {
      mapArray[currentNode.y + 1][currentNode.x].distance = currentNode.distance + 1;
      mapArray[currentNode.y + 1][currentNode.x].prev = currentNode;
    }

    let shortestDist = Infinity;
    hasMore = false;
    for (let i = 0; i < mapArray.length; i++) {
      if (mapArray[i].filled || mapArray[i].visited) {
        continue;
      }

      if (mapArray[i].distance < shortestDist) {
        shortestDist = mapArray[i].distance;
        currentNode = mapArray[i];
        hasMore = true;
      }
    }

    if (currentNode.x === end.x && currentNode.y === end.y) {
      var path = [];
      while (currentNode.prev) {
        path.unshift(currentNode);
        currentNode = currentNode.prev;
      }

      return path;
    }

    return null;
  }
}