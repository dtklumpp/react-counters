import React, { Component } from "react";
import Header from "./Header";
import CounterList from './CounterList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CounterList count={this.props.data.counters}/>
      </div>
    );
  }
}

export default App;
