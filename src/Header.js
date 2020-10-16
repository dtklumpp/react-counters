import React, { Component } from "react";

class Header extends Component {

  plusFunction = () => {
    this.props.increase();
  }

  render() {

    return (
      <header className="App-header">
        <h1 className="App-title">React Counters</h1>
        <button onClick={this.plusFunction}>+</button>
        <button onClick={this.props.decrease}>-</button>
      </header>
    );
  }
}

export default Header;
