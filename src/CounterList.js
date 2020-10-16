import React, {Component} from 'react';
import Counter from './Counter';

class CounterList extends Component {


    render() {

        const counterSet = [];
        for (let i = 0; i < this.props.count; i++){
            counterSet.push(<Counter className="counter" key={i}/>);
        }
        console.log(counterSet);

        return (<div className="counterList">
            {counterSet}
        </div>
        ) 
    }
}



export default CounterList;
