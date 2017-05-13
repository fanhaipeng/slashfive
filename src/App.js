import React, { Component } from 'react';
import './App.css';

var NODE_TYPES = 6
var ROW_NUMBER = 9;
var NEW_NODE_NUMBER = 3;
class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: [],
      nextSquares: [],
      playing: false
    };
  }

  startGame() {
    let initialSquares = this.setupSquares();
    let initialNextSquares = this.getNextSquares();
    this.setState({
      squares: initialSquares,
      nextSquares: initialNextSquares,
      playing: true
    });
  }

  setupSquares() {
    let squares = new Array(ROW_NUMBER * ROW_NUMBER);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = {
        x: i,
        y: i % ROW_NUMBER,
        filled: false,
        type: null
      }
    }

    this.addNewNodes(squares);
    return squares;
  }

  addNewNodes(squares) {
    let nextSquares = this.getNextSquares();
    for (let i = 0; i < nextSquares.length; i++) {
      var nextNodeIndex = Math.floor(Math.random() * ROW_NUMBER * ROW_NUMBER);
      do {
        if (!squares[nextNodeIndex].filled) {
          squares[nextNodeIndex].filled = true;
          squares[nextNodeIndex].type = nextSquares[i];
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

  getNextSquares() {
    let result = [];
    for (let i = 0; i < NEW_NODE_NUMBER; i++) {
      result.push(Math.floor(Math.random() * NODE_TYPES + 1));
    }
    return result;
  }

  render() {
    return (
      <div className="app">
        <InformationPanel startButtonText={this.state.playing ? "Restart Game" : "Start Game"} onStartButtonClick={() => this.startGame()} />
        <Board />
        <StatusPanel />
      </div>
    );
  }
}

class Square extends Component {
  render() {
    return (
      <div className="square" />
    );
  }
}

class Board extends Component {
  render() {
    return (
      <div className="board" >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((j) => {
          let row = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            return <Square key={i} />;
          });
          return <div className="board-row" key={j}>{row}</div>;
        })}
      </div>
    );
  }
}

class StatusPanel extends Component {
  render() {
    return (
      <div className="status-panel" >
        <Score />
        <div className="next-square">
          <span className="next-label">Next</span>
          {[0, 1, 2].map((i) => {
            return <Square key={i} />;
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
        <button className="start-button" onClick={this.props.onStartButtonClick()}>{this.props.startButtonText}</button>
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