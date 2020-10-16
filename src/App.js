import React, { Component } from "react";
import Header from "./Header";
import CounterList from './CounterList.js';

class App extends Component {

  state = {
    counters: 4,
  }

  increaseCounters = () => {
    const updated = this.state.counters + 1;
    this.setState({
      counters: updated,
    })
  }

  decreaseCounters = () => {
    if(this.state.counters > 1){
      const updated = this.state.counters - 1;
      this.setState({
        counters: updated,
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Header increase={this.increaseCounters} decrease={this.decreaseCounters}/>
        <CounterList className="CounterList" count={this.state.counters}/>
      </div>
    );
  }
}

export default App;
