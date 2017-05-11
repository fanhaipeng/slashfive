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
            return <Square key={i}/>;
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
            return <Square key={i}/>;
          })}
        </div>
        <div className="clear"/>
      </div>
    );
  }
}

class Score extends Component {
  render(){
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
