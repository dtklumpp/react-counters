import React, {Component} from 'react';
import CounterList from './CounterList';


class Counter extends Component {

    state = {
        clicker: 0,
    }

    increment = () => {
        this.setState({
            clicker: this.state.clicker + 1,
        })
    }

    decrement = () => {
        this.setState({
            clicker: this.state.clicker - 1,
        })
    }

    render() {
        return <div>
                <h4>Counter: {this.state.clicker}</h4>
                <button onClick={this.increment}>Plus</button>
                <button onClick={this.decrement}>Minus</button>
            </div>
    }
}




export default Counter;
