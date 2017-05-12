import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <InformationPanel />
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
    return <div className="info-panel" >Welcome!</div>;
  }
}


export default App;

function findPath(squareMap, start, end) {
  const ROW_NUMBER = 9;
  if (!squareMap || squareMap.length != ROW_NUMBER * ROW_NUMBER || !start || !end) {
    return null;
  }

  let currenNode = null;
  var mapArray = squareMap.map((node, index) => {
    let output = {
      x = node.x,
      y = node.y,
      filled = node.filled,
      visited = false,
      distance = Infinity,
      prev = null,
    };

    if (start.x == node.x && start.y == node.y) {
      currentNode = output;
      distance = 0;
    }
  });

  if (!currentNode) {
    return null;
  }

  let hasMore = true;
  while (hasMore) {
    curentNode.visited = true;
    if (currentNode.x == end.x && currentNode.y == end.y) {
      break;
    }

    if (currentNode.x > 0 &&
      !mapArray[currentNode.y][currentNode.x - 1].filled &&
      mapArray[currentNode.y][currentNode.x - 1].distance > currentNode.distance + 1) {
      mapArray[cucrrentNode.y][currentNode.x - 1].distance = currentNode.distance + 1;
      mapArray[cucrrentNode.y][currentNode.x - 1].prev = currentNode;
    } 
    
    if (currentNode.x < ROW_NUMBER &&
      !mapArray[currentNode.y][currentNode.x + 1].filled &&
      mapArray[currentNode.y][currentNode.x + 1].distance > currentNode.distance + 1) {
      mapArray[cucrrentNode.y][currentNode.x + 1].distance = currentNode.distance + 1;
      mapArray[cucrrentNode.y][currentNode.x + 1].prev = currentNode;
    } 
    
    if (currentNode.y > 0 &&
      !mapArray[currentNode.y - 1][currentNode.x].filled &&
      mapArray[currentNode.y - 1][currentNode.x].distance > currentNode.distance + 1) {
      mapArray[cucrrentNode.y - 1][currentNode.x].distance = currentNode.distance + 1;
      mapArray[cucrrentNode.y - 1][currentNode.x].prev = currentNode;
    } 
    
    if (currentNode.y < ROW_NUMBER &&
      !mapArray[currentNode.y + 1][currentNode.x].filled &&
      mapArray[currentNode.y + 1][currentNode.x].distance > currentNode.distance + 1) {
      mapArray[cucrrentNode.y + 1][currentNode.x].distance = currentNode.distance + 1;
      mapArray[cucrrentNode.y + 1][currentNode.x].prev = currentNode;
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

    if (currentNode.x == end.x && currentNode.y == end.y) {
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